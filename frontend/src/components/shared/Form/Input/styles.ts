import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	min-width: 6.25rem;
	width: auto;
`;

export const LabelContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin-bottom: 0.5rem;

	> label {
		color: ${props => props.theme.colors.gray500};
	}
`;

interface InputContainerProps {
	hasError: boolean;
}

export const InputContainer = styled.div<ErrorProps>`
	display: flex;
	align-items: center;
	width: 100%;
	background: ${props => props.theme.colors.white};
	border-radius: 8px;
	padding: 16px;

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
	color: red;
	margin-top: 4px;
	font-size: ${props => props.theme.fontSizes.small};

	> svg {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
`;
