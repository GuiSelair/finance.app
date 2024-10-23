import styled, { keyframes, css } from 'styled-components';

export interface SpinnerProps {
	/**
	 * Variação do tamanho do spinner (sm: 16px, md: 24px, lg: 32px)
	 * @default md
	 */
	size?: 'sm' | 'md' | 'lg';
	/**
	 * Modo de coloração do spinner (light: color white, dark: color green800)
	 * @default dark
	 */
	mode?: 'light' | 'dark' | 'same-color';
}

const spinAnimation = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
`;

const SPINNER_SIZE_MAPPER = {
	sm: css`
		width: 16px;
		height: 16px;
		border-width: 2px;
	`,
	md: css`
		width: 24px;
		height: 24px;
		border-width: 3px;
	`,
	lg: css`
		width: 32px;
		height: 32px;
		border-width: 4px;
	`,
};

const spinnerColorMapper = {
	light: css`
		border-top-color: ${({ theme }) => theme.colors.white};
	`,
	dark: css`
		border-top-color: ${({ theme }) => theme.colors.green800};
	`,
	'same-color': css`
		border-top-color: inherit;
	`,
};

export const Spinner = styled.div.withConfig({
	shouldForwardProp: prop => !['size', 'mode'].includes(prop),
})<SpinnerProps>`
	display: inline-block;
	border: 3px solid transparent;
	border-radius: 50%;
	animation: ${spinAnimation} 0.5s linear infinite;

	${({ mode }: { mode?: keyof typeof spinnerColorMapper }) => spinnerColorMapper[mode ?? 'dark']};
	${({ size }: { size?: keyof typeof SPINNER_SIZE_MAPPER }) => SPINNER_SIZE_MAPPER[size ?? 'md']};
`;
