import styled from 'styled-components';

import { Button } from '@/components/Button';

export const LoginContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: stretch;
`;

export const HighlightImageContainer = styled.div`
	height: 100%;
	width: 100%;
	max-width: 544px;
	background: url('/images/login-image.jpg') no-repeat right;
	background-size: cover;

	@media (max-width: 1200px) {
		max-width: 444px;
	}

	@media (max-width: 900px) {
		display: none;
	}
`;

export const LoginContentCenter = styled.main`
	flex: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 1.5rem;
`;

export const ResponsiveContainer = styled.div`
	display: grid;
	grid-template-rows: 100px 1fr;
	gap: 1rem;
	height: 100%;

	@media (max-width: 900px) {
		grid-template-rows: 50px 1fr;
	}
`;

export const HeaderLogo = styled.header`
	color: ${props => props.theme.colors.green800};
	font-size: ${props => props.theme.fontSizes.medium};
	align-self: end;

	@media (max-width: 900px) {
		align-self: end;
		font-size: ${props => props.theme.fontSizes['regular']};
	}
`;

export const LoginFormContent = styled.form`
	margin-top: 8rem;
	max-width: 625px;
	width: 100%;

	@media (max-height: 700px) {
		margin-top: 5rem;
	}
`;

export const LoginTitle = styled.h1`
	font-weight: 600;
	font-size: ${props => props.theme.fontSizes.xl};
	line-height: 54px;
	margin-bottom: 1rem;

	@media (max-width: 900px) {
		font-size: ${props => props.theme.fontSizes.large};
	}
`;

export const LoginSubtitle = styled.h2`
	font-size: ${props => props.theme.fontSizes.regular};
	font-weight: 400;
	line-height: 16px;
	margin-bottom: 2.5rem;
`;

export const LoginFormSubmitButton = styled(Button)`
	margin-top: 1.5rem;
`;
