import { BaseModal, Button } from '@/components';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { DeleteExpenseFunction } from '../../hooks/useDashboard';

import {
	ConfirmDeleteExpenseFooterContainer,
	ConfirmDeleteExpenseMessage,
	DeleteAllParcelsButton,
} from './ConfirmDeleteExpenseModal.styles';

interface ConfirmDeleteExpenseModalProps {
	onDeleteExpense: DeleteExpenseFunction;
	expense: ExpenseInMonth | null;
	isOpen: boolean;
	onClose: () => void;
}

export function ConfirmDeleteExpenseModal({
	onDeleteExpense,
	isOpen,
	onClose,
	expense,
}: ConfirmDeleteExpenseModalProps) {
	if (!expense) {
		return null;
	}
	const { executeDelete, isDeleting } = onDeleteExpense();

	const hasMultipleParcels = expense?.quantityParcel > 1;

	async function handleDelete(isDeleteOne = false) {
		await executeDelete({
			expenseId: isDeleteOne ? String(expense?.id) : String(expense?.expenseId),
			isDeleteOne: isDeleteOne ? 1 : 0,
		});
		onClose();
	}

	function handleClose() {
		return isDeleting ? undefined : onClose();
	}

	return (
		<BaseModal open={isOpen} onClose={handleClose} title="Excluir despesa">
			<ConfirmDeleteExpenseMessage>
				Você tem certeza que deseja <strong>excluir</strong> a despesa? Essa ação não pode ser desfeita.
			</ConfirmDeleteExpenseMessage>
			<ConfirmDeleteExpenseFooterContainer>
				<Button variant="link" onClick={handleClose}>
					Cancelar
				</Button>
				{hasMultipleParcels && (
					<DeleteAllParcelsButton variant="outline" isLoading={isDeleting} onClick={() => handleDelete(false)}>
						Excluir todas as parcelas
					</DeleteAllParcelsButton>
				)}
				<Button variant="danger" isLoading={isDeleting} onClick={() => handleDelete(true)}>
					{hasMultipleParcels ? 'Excluir apenas esta parcela' : 'Excluir parcela'}
				</Button>
			</ConfirmDeleteExpenseFooterContainer>
		</BaseModal>
	);
}
