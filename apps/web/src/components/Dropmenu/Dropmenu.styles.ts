import styled from 'styled-components';
import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

export const DropmenuContentContainer = styled(DropdownMenuContent)`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: ${({ theme }) => theme.radius.regular};
	padding: 8px;
	min-width: 220px;
`;

export const DropmenuItemContainer = styled(DropdownMenuItem)`
	width: 100%;
	text-align: left;
	padding: 8px;
	border-radius: ${({ theme }) => theme.radius.small};
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.green100};
	}
`;
