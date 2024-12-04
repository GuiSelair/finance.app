import styled, { css } from 'styled-components';

import { ButtonContainerProps } from './';

const BUTTON_VARIANT_MAPPER = {
	solid: css`
		background-color: ${({ theme }) => theme.colors.green500};
		color: ${({ theme }) => theme.colors.white};
		font-weight: 600;

		&:not(:disabled):hover {
			background-color: ${({ theme }) => theme.colors.green600};
		}
	`,
	outline: css`
		background-color: transparent;
		color: ${({ theme }) => theme.colors.green500};
		border: 1px solid ${({ theme }) => theme.colors.green500};
		font-weight: 500;

		&:not(:disabled):hover {
			background-color: ${({ theme }) => theme.colors.green500};
			color: ${({ theme }) => theme.colors.white};
		}
	`,
	ghost: css`
		border: 1px solid transparent;
		background-color: ${({ theme }) => theme.colors.green100};
		color: ${({ theme }) => theme.colors.green500};
		font-weight: 500;

		&:not(:disabled):hover {
			border-color: ${({ theme }) => theme.colors.green500};
		}
	`,
	link: css`
		background-color: transparent;
		color: ${({ theme }) => theme.colors.green500};

		&:not(:disabled):hover {
			background-color: ${({ theme }) => theme.colors.green100};
		}
	`,
	danger: css`
		background-color: ${({ theme }) => theme.colors.red700};
		color: ${({ theme }) => theme.colors.white};
		font-weight: 600;

		&:not(:disabled):hover {
			background-color: ${({ theme }) => theme.colors.red900};
		}
	`,
};

const BUTTON_SIZE_MAPPER = {
	xs: css`
		padding: 4px 8px;
		font-size: ${({ theme }) => theme.fontSizes.xs};
	`,
	sm: css`
		padding: 8px 12px;
		font-size: ${({ theme }) => theme.fontSizes.small};
	`,
	md: css`
		padding: 12px 16px;
		font-size: ${({ theme }) => theme.fontSizes.regular};
	`,
	lg: css`
		padding: 14px 18px;
		font-size: ${({ theme }) => theme.fontSizes['semi-medium']};
	`,
	icon: css`
		padding: 6px;
	`,
	full: css`
		width: 100%;
		padding: 8px 16px;
	`,
};

export const ButtonContainer = styled.button.withConfig({
	shouldForwardProp: prop => !['variant', 'size', 'fullWidth'].includes(prop),
})<ButtonContainerProps>`
	all: unset;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-radius: 8px;
	gap: 8px;
	width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
	transition: all 0.2s;
	cursor: pointer;

	${({ variant }: { variant?: keyof typeof BUTTON_VARIANT_MAPPER }) => BUTTON_VARIANT_MAPPER[variant ?? 'solid']};
	${({ size }: { size?: keyof typeof BUTTON_SIZE_MAPPER }) => BUTTON_SIZE_MAPPER[size ?? 'md']};

	&:focus {
		box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.green500};
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;
