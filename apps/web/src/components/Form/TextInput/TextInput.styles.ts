import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	min-width: 6.25rem; // ~100px
	width: 100%;
`;

interface BaseInputStyleContainerProps {
	hasError: boolean;
	isDisabled?: boolean;
	size?: 'sm' | 'md';
}

const INPUT_SIZE_MAPPER = {
	sm: css`
		padding: 0.5rem 0.75rem;
		input {
			font-size: ${({ theme }) => theme.fontSizes.small};
		}
	`,
	md: css`
		padding: 0.75rem 1rem;
		font-size: ${({ theme }) => theme.fontSizes.regular};
	`,
};

export const BaseInputStyleContainer = styled.div.withConfig({
	shouldForwardProp: prop => !['hasError', 'isDisabled'].includes(prop),
})<BaseInputStyleContainerProps>`
	display: flex;
	align-items: center;
	width: 100%;
	background: ${props => props.theme.colors.white};
	border-radius: 4px;
	box-shadow: 0 0 0 1px ${props => props.theme.colors.gray100};

	${props =>
		props.hasError &&
		css`
			box-shadow: 0 0 0 2px ${props => props.theme.colors.red500};
		`};

	${props =>
		props.isDisabled &&
		css`
			background: ${props => props.theme.colors.gray100};
			box-shadow: none;
			cursor: not-allowed;
		`};

	&:focus-within,
	&:focus {
		box-shadow: 0 0 0 2px ${props => props.theme.colors.green500};
	}

	> svg {
		margin-right: 8px;
		color: ${props => props.theme.colors.green500};
	}

	input {
		width: 100%;
		background: transparent;
		border: 0;
		color: ${props => props.theme.colors.gray400};
		font-size: ${props => props.theme.fontSizes.regular};
		font-weight: 400;

		&::placeholder {
			color: ${props => props.theme.colors.gray300};
		}

		&:disabled {
			color: ${props => props.theme.colors.gray300};
			cursor: not-allowed;
		}
	}

	${({ size }) => INPUT_SIZE_MAPPER[size ?? 'md']};
`;

export const Prefix = styled.span`
	color: ${props => props.theme.colors.gray300};
	font-size: ${props => props.theme.fontSizes.small};
	font-weight: 300;
	margin-right: 8px;
`;

export const Error = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.colors.red500};
	margin-top: 6px;
	font-size: ${props => props.theme.fontSizes.small};

	> svg {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
`;
