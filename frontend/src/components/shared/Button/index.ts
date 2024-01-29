import styled from "styled-components";

export const Button = styled.button`
	all: unset;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	border-radius: 8px;
	padding: 1rem 2rem;
	transition: filter 0.2s;
	cursor: pointer;

	&:hover {
		filter: brightness(0.9);
	}

	&:focus {
		box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.green500};
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
`;