import styled from 'styled-components';

export const HomeContainer = styled.div`
	width: 100%;
	height: 800px;

	> div {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 74px;
		align-items: center;
	}
`;
