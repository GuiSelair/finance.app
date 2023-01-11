import { useContextSelector } from 'use-context-selector';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { SEO } from '@/components/shared/SEO';
import { Input } from '@/components/shared/Form/Input';
import { AuthContext } from '@/contexts/AuthContext';

import {
	BackgroundContainer,
	HighlightImageContainer,
	Content,
	Container,
} from '@/styles/pages/login.style';

const loginInputSchema = Yup.object().shape({
	email: Yup.string().email('Email inválido.').required('Email obrigatório'),
	password: Yup.string()
		.min(8, 'A senha deve ter pelo menos 8 caracteres')
		.required('Senha obrigatória'),
});

interface LoginInputsProps {
	email: string;
	password: string;
}

export default function Login(): JSX.Element {
	const onSignIn = useContextSelector(AuthContext, value => value.onSignIn);
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<LoginInputsProps>({
		resolver: yupResolver(loginInputSchema),
	});

	const handleLoginSubmit = async (data: LoginInputsProps) => {
		await onSignIn({
			email: data.email,
			password: data.password,
		});
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

						<Input
							type="email"
							id="email"
							label="Email"
							error={errors?.email?.message}
							placeholder="Insira sua email"
							{...register('email')}
						/>

						<Input
							type="password"
							id="password"
							label="Senha"
							error={errors?.password?.message}
							placeholder="Insira sua senha"
							{...register('password')}
						/>

						<button type="submit">Entrar</button>
					</Content>
				</Container>
				<HighlightImageContainer />
			</BackgroundContainer>
		</>
	);
}
