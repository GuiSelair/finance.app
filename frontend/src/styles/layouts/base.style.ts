import styled from 'styled-components';

export const BaseContainer = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const BackgroundHero = styled.div`
	width: 100%;
	height: 368px;
	background: ${props => props.theme.colors.green800};
`;

export const BaseContent = styled.div`
	width: 100%;
	max-width: calc(1200px - 32px);
	padding: 48px 0 16px;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
`;
