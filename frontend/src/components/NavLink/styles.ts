import Link from 'next/link';
import styled, { css } from 'styled-components';

interface LinkToPageProps {
	active: 0 | 1;
}

export const LinkToPage = styled(Link)<LinkToPageProps>`
	font-size: ${props => props.theme.fontSizes.regular};
	font-weight: 400;
	color: ${props => props.theme.colors.green100};
	padding: 8px 16px;
	border-radius: 8px;
	text-decoration: none;
	background-color: transparent;

	& + a {
		margin-left: 8px;
	}

	${props =>
		props.active &&
		css`
			background-color: ${props => props.theme.colors.green500};
		`}

	&:hover {
		background-color: ${props => props.theme.colors.green500};
	}
`;
