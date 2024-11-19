import styled from 'styled-components';

import { Button } from '@/components/Button';

export const ConfirmDeleteExpenseMessage = styled.span`
	font-size: 1rem;
	color: ${({ theme }) => theme.colors.gray600};
`;

export const ConfirmDeleteExpenseFooterContainer = styled.footer`
	display: flex;
	justify-content: flex-end;
	margin-top: 2rem;
	gap: 0.5rem;
`;

export const DeleteAllParcelsButton = styled(Button)`
	color: ${({ theme }) => theme.colors.red700};
	border-color: ${({ theme }) => theme.colors.red700};

	&:not(:disabled):hover {
		background-color: ${({ theme }) => theme.colors.red700};
	}
`;
