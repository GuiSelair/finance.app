import styled from 'styled-components';

import { Box } from '../Box';

export const LayoutBoxContainer = styled.main`
	background: ${props => props.theme.colors.white};
	padding: 1.5rem;
	border-radius: 8px;
	min-height: 500px;
	display: flex;
	flex-direction: column;
`;

export const LayoutBoxTitle = styled.h2`
	font-weight: 600;
	font-size: 2rem;
	line-height: 100%;
	letter-spacing: -0.05em;
	color: ${({ theme }) => theme.colors.green800};
`;

export const LayoutBoxHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
`;

export const LayoutBoxHeaderButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const LayoutBoxContent = styled(Box)`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const LayoutBoxFooter = styled(Box).attrs({ as: 'footer' })`
	height: 60px;
	width: 100%;
	display: flex;
	align-items: center;
`;

export const LayoutBoxFooterLeftSide = styled(Box)`
	justify-content: flex-start;
	width: inherit;
`;

export const LayoutBoxFooterRightSide = styled(Box)`
	justify-content: flex-end;
	width: inherit;
`;
