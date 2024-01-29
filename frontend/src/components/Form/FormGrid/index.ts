import styled from "styled-components";

interface BaseDisplayFormProps {
	margin?: string;
	padding?: string;
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
	justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
	width?: string;
	gap?: string;
	flex?: number;
}

const BaseDisplayForm = styled.div<BaseDisplayFormProps>`
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
	display: flex;
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};
	width: ${({ width }) => width};
	gap: ${({ gap }) => gap};
	flex: ${({ flex }) => flex};
`;

export const Row = styled(BaseDisplayForm)`
	display: flex;
	align-items: center;
`;

export const Column = styled(BaseDisplayForm)`
	display: flex;
	flex-direction: column;
`;