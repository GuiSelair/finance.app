import { Input } from '@/components/shared/Form/Input';

import {
	BackgroundContainer,
	HighlightImageContainer,
	Content,
	Container,
} from '@/styles/pages/login.style';

export default function Login(): JSX.Element {
	return (
		<BackgroundContainer>
			<Container>
				<Content>
					<h1>Faça seu login!</h1>
					<h2>
						Faça sua autenticação para começarmos a gerenciar suas despesas
					</h2>
					<Input
						type={'password'}
						id="email"
						label="Email"
						placeholder="Insira sua email"
						description="Erro"
					/>
				</Content>
			</Container>
			<HighlightImageContainer />
		</BackgroundContainer>
	);
}
