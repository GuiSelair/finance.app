import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormExpenseFieldsType, createFormExpenseFormSchema } from '../constants/formSchema';
import { useCreateExpenseApi } from '@/hooks/api/expenses/useCreateExpense.api';
import { useCalculateParcel } from './useCalculateParcel';

export function useCreateExpense() {
	const router = useRouter();
	const formSchema = useForm<FormExpenseFieldsType>({
		resolver: yupResolver(createFormExpenseFormSchema(false)),
		defaultValues: {
			parcelQuantity: 1,
		},
	});
	const { mutateAsync, isLoading: isCreating } = useCreateExpenseApi();
	const { calculateParcelValue } = useCalculateParcel();

	async function createExpenseSubmit(data: FormExpenseFieldsType): Promise<void> {
		await mutateAsync({
			name: data.name,
			amount: data.totalValue,
			cardId: data.paymentMethod.value,
			parcel: data.parcelQuantity,
			isRecurring: data.isRecurring,
			purchaseDate: data.purchaseDate,
		});
		toast.success('Despesa criada com sucesso!');
		router.push('/');
	}

	const parcelValue =
		calculateParcelValue(Number(formSchema.watch('totalValue')), formSchema.watch('parcelQuantity')) ?? 0;

	return {
		parcelValue,
		createExpenseSubmit,
		isCreatingExpense: isCreating,
		formSchema,
	};
}
