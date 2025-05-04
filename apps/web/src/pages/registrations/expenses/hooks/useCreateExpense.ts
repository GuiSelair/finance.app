import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMonth, getYear } from 'date-fns';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormExpenseFieldsType, createFormExpenseFormSchema } from '../constants/formSchema';
import { useCreateExpenseApi } from '@/hooks/api/expenses/useCreateExpense.api';

export function useCreateExpense() {
	const formSchema = useForm<FormExpenseFieldsType>({
		resolver: yupResolver(createFormExpenseFormSchema(false)),
		defaultValues: {
			parcelQuantity: 1,
			isSplit: false,
			isRecurring: false,
			manualExpenseDate: `${getYear(new Date())}-${getMonth(new Date()) + 1}`,
		},
	});
	const { mutateAsync, isLoading: isCreating } = useCreateExpenseApi();

	const calculateParcelValue = useCallback((value: number, parcels: number) => {
		if (!value || !parcels) return 0;

		return Number((value / parcels).toFixed(2));
	}, []);

	async function createExpenseSubmit(data: FormExpenseFieldsType): Promise<void> {
		await mutateAsync({
			name: data.name,
			amount: data.totalValue!,
			cardId: data.paymentMethod.value,
			parcel: data.parcelQuantity,
			isRecurring: data.isRecurring,
			purchaseDate: data.purchaseDate,
			manualExpenseDate: data.manualExpenseDate!,
			sharePeopleExpense: data.sharePeopleExpense,
		});
		toast.success('Despesa criada com sucesso!');
		formSchema.resetField('name');
		formSchema.resetField('category');
		formSchema.resetField('totalValue');
		formSchema.resetField('isRecurring');
		formSchema.resetField('parcelQuantity');
		formSchema.resetField('parcelValue');
		formSchema.resetField('isSplit', { defaultValue: false });
		formSchema.resetField('sharePeopleExpense');
		formSchema.setFocus('name');
	}

	const totalValue = formSchema.watch('totalValue');
	const parcelValue =
		calculateParcelValue(
			Number(totalValue) || Number(String(totalValue)?.replace(',', '.')),
			formSchema.watch('parcelQuantity'),
		) ?? 0;

	useEffect(() => {
		if (parcelValue) {
			formSchema.setValue('parcelValue', parcelValue);
		}
	}, [parcelValue]);

	return {
		createExpenseSubmit,
		isCreatingExpense: isCreating,
		formSchema,
	};
}
