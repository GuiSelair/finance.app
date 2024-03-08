import styled from 'styled-components';

/**
 * FILTRO
 */

export const FilterContainer = styled.section`
	display: flex;
	align-items: center;

	background: ${props => props.theme.colors.green100};
	padding: 0.875rem 1rem;
	border-radius: 8px;
	margin-top: 1.5rem;

	gap: 0.5rem;
`;

export const FilterButton = styled.button`
	all: unset;
	border: 1px solid ${props => props.theme.colors.gray100};
	background: ${props => props.theme.colors.white};
	color: ${props => props.theme.colors.green500};
	padding: 0.7rem 1rem;
	font-weight: 500;
	border-radius: 8px;
	font-size: ${props => props.theme.fontSizes.regular};

	display: flex;
	align-items: center;
	justify-content: center;

	> svg {
		margin-right: 0.5rem;
	}

	cursor: pointer;

	&:hover {
		filter: opacity(0.8);
	}

	&:focus {
		outline: 1px solid ${props => props.theme.colors.green500};
	}
`;
