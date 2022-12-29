import {
	BackgroundContainer,
	HighlightImageContainer,
	Content,
	Container,
} from '../../styles/pages/login.style';

export default function Login(): JSX.Element {
	return (
		<BackgroundContainer>
			<Container>
				<Content>
					<h1>Faça seu login!</h1>
					<h2>
						Faça sua autenticação para começarmos a gerenciar suas despesas
					</h2>
				</Content>
			</Container>
			<HighlightImageContainer />
		</BackgroundContainer>
	);
}
