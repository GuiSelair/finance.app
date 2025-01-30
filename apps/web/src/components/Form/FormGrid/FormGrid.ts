import styled from 'styled-components';

import { Flex } from '@/components/Flex';

export const Row = styled(Flex)`
	display: flex;
`;

export const Column = styled(Flex)`
	display: flex;
	flex-direction: column;
`;

interface GridColumnProps {
	gridTemplateColumns?: string;
}

export const GridColumn = styled(Flex).withConfig({
	shouldForwardProp: prop => !['gridTemplateColumns'].includes(prop),
})<GridColumnProps>`
	display: grid;
	grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns ?? 'unset'};
`;
