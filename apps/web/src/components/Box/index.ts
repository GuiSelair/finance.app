import styled from 'styled-components';

interface BoxProps {
	margin?: string;
	padding?: string;
	flexDirection?: 'row' | 'column';
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
	justifyContent?:
		| 'center'
		| 'flex-start'
		| 'flex-end'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	width?: string;
	height?: string;
	gap?: string;
	flex?: number;
}

export const Box = styled.div<BoxProps>`
	display: flex;
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	width: ${({ width }) => width};
	gap: ${({ gap }) => gap};
	flex: ${({ flex }) => flex};
	flex-direction: ${({ flexDirection }) => flexDirection};
	height: ${({ height }) => height};
`;
