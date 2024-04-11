import { httpClient } from '@/providers/HTTPClient';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

interface ICreateExpenseParams {
	name: string;
	amount: number;
	card_id: string;
	parcel: number;
	is_recurring?: boolean;
}

export function useCreateExpenseApi() {
	return useMutation(
		['expenses'],
		async (newUser: ICreateExpenseParams) => {
			const response = await httpClient.post('/expenses', {
				body: newUser,
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
