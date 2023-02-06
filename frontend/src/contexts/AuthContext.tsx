import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import jwtDecode from 'jwt-decode';

import { httpClient } from '@/providers/HTTPClient';
import { cookies } from '@/providers/cookies';

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

interface AuthProviderProp {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProp) => {
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

	useEffect(() => {
		if (token) {
			const tokenDecoded = jwtDecode<JWTAuthenticateTokenContentProps>(token);
			setUserData({
				email: tokenDecoded.email,
				name: tokenDecoded.name,
				id: tokenDecoded.id,
			});
		}
	}, [token]);

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
					maxAge: 30 * 24 * 60 * 60,
				},
			);
		} catch (error) {
			console.log(error);
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
