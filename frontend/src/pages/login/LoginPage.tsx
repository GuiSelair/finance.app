import { useContextSelector } from 'use-context-selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GetServerSideProps } from 'next';

import { SEO } from '@/components/SEO';
import { AuthContext } from '@/contexts/AuthContext';
import { InputLabel, PasswordInput, TextInput } from '@/components/Form';
import { Button } from '@/components/Button';

import {
	LoginContainer,
	HighlightImageContainer,
	LoginFormContent,
	HeaderLogo,
	ResponsiveContainer,
	LoginContentCenter,
	LoginSubtitle,
	LoginTitle,
	LoginFormSubmitButton,
} from './styles';

const loginInputSchema = Yup.object().shape({
	email: Yup.string().email('Email inválido.').required('Email obrigatório'),
	password: Yup.string()
		.min(6, 'A senha deve ter pelo menos 8 caracteres')
		.required('Senha obrigatória'),
});

interface LoginInputsProps {
	email: string;
	password: string;
}

export default function LoginPage(): JSX.Element {
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const onSignIn = useContextSelector(AuthContext, value => value.onSignIn);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginInputsProps>({
		resolver: yupResolver(loginInputSchema),
	});

	const handleLoginSubmit = async (data: LoginInputsProps) => {
		setIsPending(true);
		const isLoginSuccessfull = await onSignIn({
			email: data.email,
			password: data.password,
		});
		setIsPending(false);

		if (isLoginSuccessfull) {
			await router.push('/');
		}
	};

	return (
		<>
			<SEO title="Faça seu login" />
			<LoginContainer>
				<LoginContentCenter>
					<ResponsiveContainer>
						<HeaderLogo>
							<strong>Finance</strong>.app
						</HeaderLogo>
						<LoginFormContent onSubmit={handleSubmit(handleLoginSubmit)}>
							<LoginTitle>Faça seu login!</LoginTitle>
							<LoginSubtitle>
								Faça sua autenticação para começar a gerenciar suas despesas.
							</LoginSubtitle>

							<InputLabel>
								Email:
								<TextInput
									type="email"
									error={errors?.email?.message}
									placeholder="Insira sua email"
									{...register('email')}
								/>
							</InputLabel>

							<InputLabel>
								Senha:
								<PasswordInput
									type="password"
									id="password"
									error={errors?.password?.message}
									placeholder="Insira sua senha"
									{...register('password')}
								/>
							</InputLabel>

							<LoginFormSubmitButton
								type="submit"
								isLoading={isPending}
								variant="solid"
								size="lg"
								spinnerConfig={{ mode: 'light', size: 'md' }}
								fullWidth
							>
								Entrar
							</LoginFormSubmitButton>
						</LoginFormContent>
					</ResponsiveContainer>
				</LoginContentCenter>
				<HighlightImageContainer />
			</LoginContainer>
		</>
	);
}

LoginPage.notUseLayout = true;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const hasAuthenticationToken =
		req.cookies[
			`${process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''}-token`
		];

	if (hasAuthenticationToken) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
