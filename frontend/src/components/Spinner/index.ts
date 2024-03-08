import styled, { keyframes, css } from 'styled-components';

interface SpinnerProps {
	/**
	 * @description sm: 16px, md: 24px, lg: 32px
	 * @default md
	 */
	size?: 'sm' | 'md' | 'lg';
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

export const Spinner = styled.div<SpinnerProps>`
	display: inline-block;
	border: 3px solid transparent;
	border-top-color: ${({ theme }) => theme.colors.green600};
	border-radius: 50%;
	animation: ${spinAnimation} 0.5s linear infinite;

	${({ size }) => SPINNER_SIZE_MAPPER[size || 'md']};
`;
