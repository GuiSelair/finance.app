import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	min-width: 6.25rem; // ~100px
	width: 100%;
`;

// export const LabelContainer = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;

// 	margin-bottom: 0.5rem;

// 	> label {
// 		color: ${props => props.theme.colors.gray500};
// 		font-weight: 400;
// 	}
// `;

interface BaseInputStyleContainerProps {
	hasError: boolean;
}

export const BaseInputStyleContainer = styled.div<BaseInputStyleContainerProps>`
	display: flex;
	align-items: center;
	width: 100%;
	background: ${props => props.theme.colors.white};
	border-radius: 4px;
	padding: 0.75rem 1rem;

	${props =>
		props.hasError &&
		css`
			box-shadow: 0 0 0 2px ${props => props.theme.colors.red500};
		`};

	&:focus-within,
	&:focus {
		box-shadow: 0 0 0 2px ${props => props.theme.colors.green500};
	}

	> svg {
		margin-right: 8px;
		color: ${props => props.theme.colors.green500};
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
		color: ${props => props.theme.colors.gray400};

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
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
`;
