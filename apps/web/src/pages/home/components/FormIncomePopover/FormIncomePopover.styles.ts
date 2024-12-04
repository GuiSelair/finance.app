import styled from 'styled-components';

export const OverlayContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const OverlayTitle = styled.h3`
	font-weight: 600;
	font-size: ${({ theme }) => theme.fontSizes.regular};
	color: ${({ theme }) => theme.colors.gray400};
`;
