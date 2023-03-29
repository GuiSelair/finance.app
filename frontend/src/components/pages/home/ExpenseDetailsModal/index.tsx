import React from 'react';

import { BaseModal } from '@/components/shared/BaseModal';
import { ExpenseInMonth } from '@/models/expenseInMonth';

interface ExpenseDetailsModalProps {
	isOpenModal: boolean;
	onClose: () => void;
	expense: ExpenseInMonth;
}

export function ExpenseDetailsModal({
	expense,
	isOpenModal,
	onClose,
}: ExpenseDetailsModalProps) {
	return (
		<BaseModal
			open={isOpenModal}
			onClose={onClose}
			title="Mais detalhes da despesa"
		>
			{JSON.stringify(expense, null, 2)}
		</BaseModal>
	);
}
