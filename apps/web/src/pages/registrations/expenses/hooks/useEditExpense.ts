import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormExpenseFieldsType, createFormExpenseFormSchema } from '../constants/formSchema';
import { useEditExpenseApi } from '@/hooks/api/expenses/useEditExpense.api';
import { useFindExpenseApi } from '@/hooks/api/expenses/useFindExpense.api';
import { useEffect } from 'react';

export function useEditExpense() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const expenseId = params?.id;
	const { refetch } = useFindExpenseApi(expenseId, { ignoreInitialFetch: true });
	const formSchema = useForm<FormExpenseFieldsType>({
		resolver: yupResolver(createFormExpenseFormSchema(true)),
		defaultValues: async () => {
			const { data } = await refetch();
			return {
				parcelQuantity: data?.quantityParcel || 1,
				name: data?.expense.name || '',
				paymentMethod: { label: data?.expense.card.name || '', value: data?.expense.card.id || '' },
				purchaseDate: data?.expense.purchaseDate?.toISOString().split('T')[0] || '',
				totalValue: data?.expense.amount || 0,
				isRecurring: data?.expense.isRecurring || false,
				parcelValue: data?.valueParcel,
			};
		},
	});
	const { mutateAsync, isLoading: isEditing } = useEditExpenseApi(expenseId);

	async function editExpenseSubmit(data: FormExpenseFieldsType): Promise<void> {
		const { dirtyFields } = formSchema.formState;
		await mutateAsync({
			...(!!dirtyFields?.name && { name: data.name }),
			...(!!dirtyFields?.parcelValue && { parcelValue: data.parcelValue }),
			...(!!dirtyFields?.paymentMethod && { cardId: data.paymentMethod.value }),
			...(!!dirtyFields?.isRecurring && { isRecurring: data.isRecurring }),
		});
		toast.success('Despesa editada com sucesso!');
		router.push('/');
	}

	function goBack(): void {
		router.push('/');
	}

	useEffect(() => {
		if (!expenseId) {
			router.push('/');
		}
	}, [expenseId]);

	return {
		editExpenseSubmit,
		isEditing,
		goBack,
		formSchema,
	};
}
