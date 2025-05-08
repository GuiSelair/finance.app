import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const EmptyStateText = styled.strong`
	font-size: ${({ theme }) => theme.fontSizes.small};
	color: ${({ theme }) => theme.colors.gray400};
	font-weight: 400;
`;
