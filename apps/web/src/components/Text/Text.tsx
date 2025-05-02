import { ComponentProps } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { defaultTheme } from '../../styles/theme/default';

type ThemeColors = keyof typeof defaultTheme.colors;
type ThemeFontSizes = keyof typeof defaultTheme.fontSizes;

export interface TextProps extends ComponentProps<'span'> {
	color?: ThemeColors;
	weight?: CSSProperties['fontWeight'];
	size?: ThemeFontSizes;
	textAlign?: CSSProperties['textAlign'];
}

export const Text = styled.span.withConfig({
	shouldForwardProp: props => !['textAlign'].includes(props),
})<TextProps>`
	font-family: 'Work Sans', 'Roboto', sans-serif;
	color: ${({ theme, color }) => (color ? theme.colors[color] : theme.colors.gray500)};
	font-weight: ${({ weight }) => weight};
	font-size: ${({ theme, size }) => (size ? theme.fontSizes[size] : theme.fontSizes.regular)};
	text-align: ${({ textAlign }) => textAlign};
`;
