import styled from "styled-components";

interface IBaseExtendableProps {
	margin?: string;
	padding?: string;
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
	justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
	width?: string;
	gap?: string;
	flex?: number;
}

export const BaseExtendableProps = styled.div<IBaseExtendableProps>`
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
	display: flex;
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	width: ${({ width }) => width};
	gap: ${({ gap }) => gap};
	flex: ${({ flex }) => flex};
`;
