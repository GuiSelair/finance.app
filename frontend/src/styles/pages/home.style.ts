import styled from 'styled-components';

export const HomeContainer = styled.div`
	width: 100%;
	height: 800px;
`;

export const Summary = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 74px;
	align-items: center;
	margin-bottom: 2.5rem;
`;

export const ListExpenses = styled.main`
	background: ${props => props.theme.colors.white};
	padding: 1.5rem;
	border-radius: 8px;
	min-height: 500px;

	> header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		h2 {
			font-size: ${props => props.theme.fontSizes.large};
			color: ${props => props.theme.colors.gray400};
			line-height: 105%;
			font-weight: 600;
		}
	}
`;