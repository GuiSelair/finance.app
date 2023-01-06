import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	min-width: 6.25rem;
	width: auto;
	margin-bottom: 1rem;
`;

export const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 0.5rem;

	> label {
		color: ${props => props.theme.colors.gray500};
		font-weight: 400;
	}
`;

interface InputContainerProps {
	hasError: boolean;
	hasFocus: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
	display: flex;
	align-items: center;
	width: 100%;
	background: ${props => props.theme.colors.white};
	border-radius: 8px;
	padding: 14px;
	border: 1px solid transparent;

	${props => props.hasError && css`
		border-color: ${props => props.theme.colors.red500};
	`};

	${props => props.hasFocus && css`
		border-color: ${props => props.theme.colors.green500};
	`};
	
	> svg {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}

	button {
		margin-left: 8px;
		display: flex;
		align-items: center;
		background: transparent;
		border: 0;

		> svg {
			width: 20px;
			height: 20px;
		}
	}

	input {
		flex: 1;
		background: transparent;
		border: 0;

		&::placeholder {
			color: ${props => props.theme.colors.gray300};
		}
	}
`;

export const Description = styled.div`
	margin-top: 4px;
	display: flex;
	color: ${props => props.theme.colors.gray300};
	font-size: ${props => props.theme.fontSizes.small};
`;

export const Error = styled.div`
	display: flex;
	align-items: center;
	color: ${props => props.theme.colors.red500};
	margin-top: 4px;
	font-size: ${props => props.theme.fontSizes.small};

	> svg {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
`;
