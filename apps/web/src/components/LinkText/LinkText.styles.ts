import styled from 'styled-components';

export const LinkTextContainer = styled.strong`
	font-weight: 500;
	color: ${({ theme }) => theme.colors.green600};
	margin-left: 0.5rem;
	display: inline-flex;
	align-items: center;

	a {
		display: inline-flex;
		align-items: center;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	svg {
		width: 0.875rem;
		height: 0.875rem;
		margin-left: 0.5rem;
	}
`;
