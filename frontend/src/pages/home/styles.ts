import styled from 'styled-components';

export const HomeContainer = styled.div`
	width: 100%;
	height: 800px;
`;

export const GoToCurrentMonthAndYearButton = styled.button`
	all: unset;
	border: 1px solid ${props => props.theme.colors.gray100};
	background: ${props => props.theme.colors.white};
	color: ${props => props.theme.colors.green500};
	padding: 0.5rem 1rem;
	font-weight: 500;
	border-radius: 8px;
	font-size: ${props => props.theme.fontSizes.regular};
	margin-right: 1rem;
	cursor: pointer;
	transition: border-color 0.2s;

	&:hover {
		border-color: ${props => props.theme.colors.green500};
	}

	&:focus {
		outline: 1px solid ${props => props.theme.colors.green500};
	}
`;
