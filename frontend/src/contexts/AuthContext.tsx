import { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

interface SignInProps {
	email: string;
	password: string;
}

export interface AuthContextProps {
	user: {
		email: string;
		name: string;
	},
	token: string;
	onSignIn: ({ email, password }: SignInProps) => Promise<void>;
	onSignOut: () => void;
}

type AuthProviderProp = {
  children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProp) => {
	const [userData, setUserData] = useState({} as AuthContextProps['user']);
	const [token, setToken] = useState(() => {
		const recoveryToken = localStorage.getItem(`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY}-token`)
		
		return recoveryToken ? recoveryToken : ''
	})

	const onSignIn = useCallback(async () => {
		console.log('logando')
	}, []);

	const onSignOut = useCallback(() => {}, []);

	return (
		<AuthContext.Provider value={{
			onSignIn,
			onSignOut,
			token,
			user: userData
		}}>
			{children}
		</AuthContext.Provider>
	)
}