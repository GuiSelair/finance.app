import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';
import { cookies } from '@/providers/cookies';
import { AuthenticateErrors } from 'errors/AuthenticateErrors';

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
			console.log(response);
			setToken(response.data.token);
			cookies.setCookie(
				undefined,
				`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`,
				response.data.token,
				{
					maxAge: 30 * 24 * 60 * 60,
				},
			);
		} catch (error) {
			console.log(error);

			toast.error(AuthenticateErrors.UnexpectedError, {
				position: 'bottom-left',
				theme: 'colored',
			});
		}
	}, []);

	const onSignOut = useCallback(() => {
		cookies.destroyCookie(
			undefined,
			`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`,
		);

		setToken('');
		setUserData({} as AuthContextProps['user']);
	}, []);

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
				window.location.href = '/login';
			}
		}
	}, [onSignOut, pushTo, token]);

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
