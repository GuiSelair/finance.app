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

import {
	BackgroundContainer,
	HighlightImageContainer,
	Content,
	Container,
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
			<BackgroundContainer>
				<Container>
					<Content onSubmit={handleSubmit(handleLoginSubmit)}>
						<h1>Faça seu login!</h1>
						<h2>
							Faça sua autenticação para começarmos a gerenciar suas despesas
						</h2>

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

						<button type="submit" disabled={isPending}>
							Entrar
						</button>
					</Content>
				</Container>
				<HighlightImageContainer />
			</BackgroundContainer>
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
