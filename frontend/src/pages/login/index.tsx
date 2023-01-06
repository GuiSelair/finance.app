import { FormEvent } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Input } from '@/components/shared/Form/Input';
import { AuthContext } from '@/contexts/AuthContext';

import {
	BackgroundContainer,
	HighlightImageContainer,
	Content,
	Container,
} from '@/styles/pages/login.style';

export default function Login(): JSX.Element {
	const onSignIn = useContextSelector(AuthContext, (value) => value.onSignIn);

	const handleLoginSubmit = async (event: FormEvent) => {
		event.preventDefault();
		console.log(event)
		await onSignIn({
			email: 'guilherme@email.com',
			password: '123456'
		});
	}

	return (
		<BackgroundContainer>
			<Container>
				<Content onSubmit={handleLoginSubmit}>
					<h1>Faça seu login!</h1>
					<h2>
						Faça sua autenticação para começarmos a gerenciar suas despesas
					</h2>

					<Input
						type='email'
						id="email"
						label="Email"
						placeholder="Insira sua email"
					/>

					<Input
						type='password'
						id="password"
						label="Senha"
						placeholder="Insira sua senha"
					/>

					<button type="submit">Entrar</button>
				</Content>
			</Container>
			<HighlightImageContainer />
		</BackgroundContainer>
	);
}
