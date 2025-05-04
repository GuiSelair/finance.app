import styled from 'styled-components';
import React from 'react';

interface FlexProps extends Omit<React.HTMLProps<HTMLDivElement>, 'display'> {
	flexDirection?: 'row' | 'column';
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
	justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
	gap?: string;
	whiteSpace?: 'nowrap' | 'normal' | 'pre' | 'pre-wrap' | 'pre-line';
	flex?: number;
	margin?: string;
	padding?: string;
}

const propsToForward = ['flexDirection', 'alignItems', 'justifyContent', 'whiteSpace', 'flex', 'margin', 'padding'];

export const Flex = styled.div.withConfig({
	shouldForwardProp: prop => !propsToForward.includes(prop),
})<FlexProps>`
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection};
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	gap: ${({ gap }) => gap};
	white-space: ${({ whiteSpace }) => whiteSpace};
	flex: ${({ flex }) => flex};
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
`;
