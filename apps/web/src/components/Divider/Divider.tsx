import { styled } from 'styled-components';

interface DividerProps {
	margin?: string;
}

export const Divider = styled.hr<DividerProps>`
	display: block;
	border: 0;
	border-top: 1px solid ${props => props.theme.colors.gray100};
	margin: ${props => props.margin || 0};
	padding: 0;
`;
