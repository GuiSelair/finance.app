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
	width: 835px;

	background: url('/images/login-image.jpg') no-repeat right;
	background-size: cover;
`;

export const Container = styled.main`
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Content = styled.form`
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
		padding: 14px;
		font-size: ${props => props.theme.fontSizes.large};
		margin-top: 1.5rem;

		&:hover {
			background: ${props => props.theme.colors.green600}
		}
	}
`;
