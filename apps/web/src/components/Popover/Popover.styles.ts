import styled from 'styled-components';
import { Content, Arrow } from '@radix-ui/react-popover';

interface PopoverContentProps {
	maxWidth?: number;
	maxHeight?: number;
}

export const PopoverContent = styled(Content).withConfig({
	shouldForwardProp: prop => !['maxWidth', 'maxHeight'].includes(prop),
})<PopoverContentProps>`
	min-width: 100px;
	max-width: ${props => props.maxWidth ?? '500'}px;
	width: auto;
	height: auto;
	max-height: ${props => props.maxHeight ?? '400'}px;
	padding: 16px;
	border-radius: 8px;
	background: #fff;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-thumb {
		background: #ccc;
		border-radius: 8px;
		border: 3px solid #ccc;
	}

	display: flex;
	flex-direction: column;
	gap: 8px;
	box-shadow: 0 6px 32px 0 rgba(0 0 0 / 20%);
`;

export const PopoverArrow = styled(Arrow)`
	fill: #fff;
`;
