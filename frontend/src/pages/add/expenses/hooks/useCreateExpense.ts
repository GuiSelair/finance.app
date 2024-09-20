import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
	CreateExpenseFieldsType,
	createExpenseFormSchema,
} from '../constants/formSchema';
import { useCreateExpenseApi } from '@/hooks/api/useCreateExpense.api';

export function useCreateExpense() {
	const router = useRouter();
	const formSchema = useForm<CreateExpenseFieldsType>({
		resolver: yupResolver(createExpenseFormSchema),
		defaultValues: {
			parcelQuantity: 1,
		},
	});
	const { mutateAsync, isLoading: isCreating } = useCreateExpenseApi();

	function calculateParcelValue(value: number, parcels: number) {
		if (!value || !parcels) return 0;

		return (value / parcels).toFixed(2);
	}

	async function createExpenseSubmit(
		data: CreateExpenseFieldsType,
	): Promise<void> {
		await mutateAsync({
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

	const parcelValue =
		calculateParcelValue(
			Number(formSchema.watch('totalValue')),
			formSchema.watch('parcelQuantity'),
		) ?? 0;

	return {
		parcelValue,
		createExpenseSubmit,
		isCreatingExpense: isCreating,
		goBack,
		formSchema,
	};
}
