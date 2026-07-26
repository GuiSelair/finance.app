import { useCallback, useEffect } from 'react';
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

	/**
	 * Registra o atalho Ctrl/Cmd+Enter para submeter o formulário sem clicar no botão.
	 * Ignora o atalho enquanto uma requisição de criação já estiver em andamento.
	 */
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (!isSubmitShortcut(event) || isCreating) return;

			event.preventDefault();
			void handleSubmit(createExpenseSubmit)();
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [createExpenseSubmit, handleSubmit, isCreating]);

	const totalValue = watch('totalValue');
	const parcelValue =
		calculateParcelValue(
			Number(totalValue) || Number(String(totalValue)?.replace(',', '.')),
			watch('parcelQuantity'),
		) ?? 0;

	/**
	 * Mantém o valor por parcela sincronizado quando o valor total ou a quantidade de parcelas mudam.
	 */
	useEffect(() => {
		if (parcelValue) {
			setValue('parcelValue', parcelValue);
		}
	}, [parcelValue, setValue]);

	return {
		createExpenseSubmit,
		isCreatingExpense: isCreating,
		formSchema,
		submitShortcutLabel: getSubmitShortcutLabel(),
	};
}
