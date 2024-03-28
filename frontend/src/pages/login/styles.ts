import styled from 'styled-components';

export const BackgroundContainer = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
	align-items: stretch;
`;

export const HighlightImageContainer = styled.div`
	height: 100%;
	width: 100%;
	max-width: 544px;

	@media (max-width: 1300px) {
		max-width: 444px;
	}

	@media (max-width: 900px) {
		display: none;
	}

	background: url('/images/login-image.jpg') no-repeat right;
	background-size: cover;
`;

export const Container = styled.main`
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1.5rem;
`;

export const ContertWrapper = styled.div`
	display: grid;
	grid-template-rows: 100px 1fr;
	gap: 1rem;
	height: 100%;

	@media (max-width: 900px) {
		grid-template-rows: 50px 1fr;
	}
`;

export const Logo = styled.div`
	color: ${props => props.theme.colors.green800};
	align-self: end;
	font-size: ${props => props.theme.fontSizes['medium']};

	@media (max-width: 900px) {
		align-self: end;
		font-size: ${props => props.theme.fontSizes['regular']};
	}
`;

export const Content = styled.form`
	margin-top: 10rem;

	@media (max-height: 700px) {
		margin-top: 5rem;
	}

	max-width: 625px;
	width: 100%;

	h1 {
		font-weight: 600;
		font-size: ${props => props.theme.fontSizes['2xl']};
		line-height: 54px;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: ${props => props.theme.fontSizes.regular};
		font-weight: 400;
		line-height: 16px;
		margin-bottom: 2.5rem;
	}

	button[type='submit'] {
		border: none;
		border-radius: 8px;
		width: 100%;
		background: ${props => props.theme.colors.green800};
		color: ${props => props.theme.colors.white};
		font-weight: 500;
		padding: 14px;
		font-size: ${props => props.theme.fontSizes.medium};
		margin-top: 1.5rem;

		&:hover {
			background: ${props => props.theme.colors.green600};
		}

		&:focus {
			outline: 2px solid ${props => props.theme.colors.green300};
		}
	}
`;
