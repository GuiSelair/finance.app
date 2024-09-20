import styled from 'styled-components';

export const HiddenButton = styled.button`
	all: unset;
	cursor: pointer;
	padding: 0 8px;
	font-size: 0;
	margin-left: 0.5rem;
	border-radius: 4px;

	display: flex;
	align-items: center;

	&:focus {
		box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.green600};
	}

	svg {
		width: 20px;
		height: 20px;
		color: ${({ theme }) => theme.colors.green600};
	}
`;
