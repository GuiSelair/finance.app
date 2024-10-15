import styled from 'styled-components';

import { Box } from '@/components/Box';

export const Row = styled(Box)`
	display: flex;
`;

export const Column = styled(Box)`
	display: flex;
	flex-direction: column;
`;

interface GridColumnProps {
	gridTemplateColumns?: string;
}

export const GridColumn = styled(Box).withConfig({
	shouldForwardProp: prop => !['gridTemplateColumns'].includes(prop),
})<GridColumnProps>`
	display: grid;
	grid-template-columns: ${({ gridTemplateColumns }) =>
		gridTemplateColumns ?? 'unset'};
`;
