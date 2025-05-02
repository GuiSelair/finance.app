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
	manualExpenseDate: string;
	sharePeopleExpense?: {
		person: {
			label: string;
			value: string;
		};
		totalValue: number;
	}[];
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
					manual_expense_date: newExpense.manualExpenseDate,
					share_expense_people: newExpense.sharePeopleExpense?.map(person => ({
						share_expense_person_id: Number(person.person.value),
						amount: person.totalValue,
					})),
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
