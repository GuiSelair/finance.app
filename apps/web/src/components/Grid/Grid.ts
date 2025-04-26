import styled from 'styled-components';
import React from 'react';

interface GridProps extends Omit<React.HTMLProps<HTMLDivElement>, 'display'> {
	margin?: string;
	padding?: string;
	gridTemplateColumns?: string;
	gridTemplateRows?: string;
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
	justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
	width?: string;
	height?: string;
	gap?: string;
}

const propsToForward = ['gridTemplateColumns', 'gridTemplateRows', 'alignItems', 'justifyContent'];

export const Grid = styled.div.withConfig({
	shouldForwardProp: props => !propsToForward.includes(props),
})<GridProps>`
	display: grid;
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	gap: ${({ gap }) => gap};
	grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
	grid-template-rows: ${({ gridTemplateRows }) => gridTemplateRows};
`;
