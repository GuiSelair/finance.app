import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMonth, getYear } from 'date-fns';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { FormExpenseFieldsType, createFormExpenseFormSchema } from '../constants/formSchema';
import { getSubmitShortcutLabel, isSubmitShortcut } from '../helpers/isSubmitShortcut';
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
	const { mutate, isLoading: isCreating } = useCreateExpenseApi();
	const { handleSubmit, resetField, setFocus, setValue, watch } = formSchema;
	const [submitShortcutLabel, setSubmitShortcutLabel] = useState('Ctrl+Enter');

	const calculateParcelValue = useCallback((value: number, parcels: number) => {
		if (!value || !parcels) return 0;

		return Number((value / parcels).toFixed(2));
	}, []);

	const createExpenseSubmit = useCallback(
		async (data: FormExpenseFieldsType): Promise<void> => {
			mutate(
				{
					name: data.name,
					amount: data.totalValue!,
					cardId: data.paymentMethod.value,
					parcel: data.parcelQuantity,
					isRecurring: data.isRecurring,
					purchaseDate: data.purchaseDate,
					manualExpenseDate: data.manualExpenseDate!,
					sharePeopleExpense: data.sharePeopleExpense,
				},
				{
					onSuccess: () => {
						toast.success('Despesa criada com sucesso!');
						resetField('name');
						resetField('category');
						resetField('totalValue');
						resetField('isRecurring');
						resetField('parcelQuantity');
						resetField('parcelValue');
						resetField('isSplit', { defaultValue: false });
						resetField('sharePeopleExpense');
						setFocus('name');
					},
				},
			);
		},
		[mutate, resetField, setFocus],
	);

	const onSubmitCreateExpense = useCallback(() => {
		if (isCreating) return;

		void handleSubmit(createExpenseSubmit)();
	}, [createExpenseSubmit, handleSubmit, isCreating]);

	useEffect(() => {
		setSubmitShortcutLabel(getSubmitShortcutLabel());
	}, []);

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (!isSubmitShortcut(event)) return;

			event.preventDefault();
			onSubmitCreateExpense();
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onSubmitCreateExpense]);

	const totalValue = watch('totalValue');
	const parcelValue =
		calculateParcelValue(
			Number(totalValue) || Number(String(totalValue)?.replace(',', '.')),
			watch('parcelQuantity'),
		) ?? 0;

	useEffect(() => {
		if (parcelValue) {
			setValue('parcelValue', parcelValue);
		}
	}, [parcelValue, setValue]);

	return {
		createExpenseSubmit,
		onSubmitCreateExpense,
		isCreatingExpense: isCreating,
		formSchema,
		submitShortcutLabel,
	};
}
