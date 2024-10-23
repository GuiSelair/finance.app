import { httpClient } from '@/providers/HTTPClient';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface IEditExpenseParams {
	name: string;
	cardId: string;
	isRecurring?: boolean;
	parcelValue: number;
}

export function useEditExpenseApi(expenseId: string) {
	return useMutation(
		['expenses', expenseId],
		async (expenseToEdit: IEditExpenseParams) => {
			await httpClient.put(`/expenses/${expenseId}/edit`, {
				body: {
					name: expenseToEdit.name,
					parcel_value: expenseToEdit.parcelValue,
					card_id: expenseToEdit.cardId,
					is_recurring: expenseToEdit.isRecurring,
				},
			});
		},
		{
			onError: () => {
				toast.error('Erro ao editar despesa! Tente novamente.');
			},
		},
	);
}
