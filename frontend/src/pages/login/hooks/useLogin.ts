import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthContext } from '@/contexts/AuthContext';
import { LoginFieldsType, loginFormSchema } from '../constants/formSchema';

export function useLogin() {
	const router = useRouter();
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const onSignIn = useContextSelector(AuthContext, value => value.onSignIn);
	const formSchema = useForm<LoginFieldsType>({
		resolver: yupResolver(loginFormSchema),
	});

	async function handleLoginSubmit(data: LoginFieldsType) {
		setIsAuthenticating(true);
		const isLoginSuccessfull = await onSignIn({
			email: data.email,
			password: data.password,
		});
		setIsAuthenticating(false);

		if (isLoginSuccessfull) {
			await router.push('/');
		}
	}

	const handleFormSubmit = formSchema.handleSubmit(handleLoginSubmit);

	return {
		formSchema: {
			...formSchema,
			handleSubmit: handleFormSubmit,
		},
		isAuthenticating,
	};
}
