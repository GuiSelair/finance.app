import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { httpClient } from '@/providers/HTTPClient';

export type ICreateExpenseFields = {
	name: string;
	category: string;
	totalValue: number;
	parcelQuantity: number;
	isRecurring: boolean;
	paymentMethod: {
		label: string;
		value: string;
	};
};

type ICreateExpenseAPIResquest = {
	name: string;
	amount: number;
	card_id: string;
	parcel: number;
	is_recurring?: boolean;
};

export function useCreateExpenses() {
	const router = useRouter();
	const createExpenseFetcher = useMutation(
		async (newUser: ICreateExpenseAPIResquest) => {
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

	function calculateParcelValue(value: number, parcels: number) {
		if (!value || !parcels) return 0;

		return (value / parcels).toFixed(2);
	}

	async function createExpenseSubmit(
		data: ICreateExpenseFields,
	): Promise<void> {
		await createExpenseFetcher.mutateAsync({
			name: data.name,
			amount: data.totalValue,
			card_id: data.paymentMethod.value,
			parcel: data.parcelQuantity,
			is_recurring: data.isRecurring,
		});
		toast.success('Despesa criada com sucesso!');
		router.push('/');
	}

	function goBack(): void {
		router.push('/');
	}

	return {
		calculateParcelValue,
		createExpenseSubmit,
		goBack,
	};
}
