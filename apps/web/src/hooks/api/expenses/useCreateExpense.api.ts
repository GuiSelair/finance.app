import { httpClient } from '@/providers/HTTPClient';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface ICreateExpenseParams {
	name: string;
	amount: number;
	cardId: string;
	parcel: number;
	isRecurring?: boolean;
	purchaseDate: string;
	expenseDate: string;
}

export function useCreateExpenseApi() {
	return useMutation(
		['expenses'],
		async (newExpense: ICreateExpenseParams) => {
			const response = await httpClient.post('/expenses', {
				body: {
					name: newExpense.name,
					amount: newExpense.amount,
					card_id: newExpense.cardId,
					parcel: newExpense.parcel,
					is_recurring: newExpense.isRecurring,
					purchase_date: newExpense.purchaseDate,
					expense_date: newExpense.expenseDate,
				},
			});

			return response.data;
		},
		{
			onError: error => {
				toast.error('Erro ao criar despesa! Tente novamente');
				console.log(error);
			},
		},
	);
}
