import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';
import { cookies } from '@/providers/cookies';
import { AuthenticateErrors } from '@/errors/AuthenticateErrors';
import { AxiosError } from 'axios';

interface SignInProps {
	email: string;
	password: string;
}

export interface AuthContextProps {
	user: {
		email: string;
		name: string;
		id: string;
	};
	token: string;
	onSignIn: ({ email, password }: SignInProps) => Promise<void>;
	onSignOut: () => void;
}

interface JWTAuthenticateTokenContentProps {
	email: string;
	id: string;
	name: string;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const { push: pushTo } = useRouter();
	const [userData, setUserData] = useState({} as AuthContextProps['user']);
	const [token, setToken] = useState(() => {
		if (typeof window === 'undefined') return '';

		const allCookies = cookies.parseCookies();

		return (
			allCookies[
				`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`
			] ?? ''
		);
	});

	const onSignIn = useCallback(async ({ email, password }: SignInProps) => {
		try {
			const response = await httpClient.post<{ token: string }>('/login', {
				body: {
					email,
					password,
				},
			});

			setToken(response.data.token);
			cookies.setCookie(
				undefined,
				`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`,
				response.data.token,
				{
					maxAge: 30 * 24 * 60 * 60, // 30 days
				},
			);

			httpClient.applyAuthenticationToken(response.data.token);
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorFromServer = error.response?.data;

				if (
					errorFromServer.message === 'Incorrect email/password combination'
				) {
					toast.error(AuthenticateErrors.EmailOrPasswordIncorrect, {
						position: 'bottom-left',
						theme: 'colored',
					});
					return;
				}
			}

			toast.error(AuthenticateErrors.UnexpectedError, {
				position: 'bottom-left',
				theme: 'colored',
			});
		}
	}, []);

	const onSignOut = useCallback(async () => {
		cookies.destroyCookie(
			undefined,
			`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`,
		);

		setToken('');
		setUserData({} as AuthContextProps['user']);
		await pushTo('/login');
	}, [pushTo]);

	useEffect(() => {
		if (token) {
			try {
				const tokenDecoded = jwtDecode<JWTAuthenticateTokenContentProps>(token);
				setUserData({
					email: tokenDecoded.email,
					name: tokenDecoded.name,
					id: tokenDecoded.id,
				});
			} catch (error) {
				onSignOut();
			}
		}
	}, [onSignOut, token]);

	return (
		<AuthContext.Provider
			value={{
				onSignIn,
				onSignOut,
				token,
				user: userData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
