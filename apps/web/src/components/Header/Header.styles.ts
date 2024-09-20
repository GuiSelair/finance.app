import Link from 'next/link';
import styled from 'styled-components';

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;

	div {
		display: flex;
		align-items: center;
	}
`;

export const Logo = styled(Link)`
	margin-right: 48px;
	font-size: ${props => props.theme.fontSizes.regular};
	font-weight: 300;
	color: ${props => props.theme.colors.green100};

	> strong {
		font-size: ${props => props.theme.fontSizes.large};
		font-weight: 700;
	}
`;

export const AddExpenseLink = styled(Link)`
	background: ${props => props.theme.colors.white};
	padding: 14px;
	color: ${props => props.theme.colors.green800};
	border-radius: 8px;
	font-weight: 500;
	margin-right: 24px;
	outline: 2px solid transparent;
	transition: all 0.2s;

	&:focus {
		outline-color: ${props => props.theme.colors.green300};
	}

	&:hover {
		opacity: 0.8;
	}
`;

export const SystemOptions = styled.div`
	border-left: 1px solid ${props => props.theme.colors.green500};
	padding-left: 16px;

	button {
		background: transparent;
		border: none;

		& + button,
		& + a {
			margin-left: 12px;
		}
	}

	a + a,
	a + button {
		margin-left: 12px;
	}

	svg {
		color: ${props => props.theme.colors.green300};
	}

	img {
		border-radius: 50%;
		border: 2px solid ${props => props.theme.colors.green300};
	}
`;
