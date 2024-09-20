import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { useCreateCardApi } from '@/hooks/api/useCreateCard.api';
import { AVAILABLE_CARDS_OPTIONS } from '../constants/availableCardsOptions';
import {
	CreateCardFieldsType,
	createCardFormSchema,
} from '../constants/formSchema';

export function useCreateCards() {
	const router = useRouter();
	const formSchema = useForm<CreateCardFieldsType>({
		defaultValues: {
			creditLimit: 0,
		},
		resolver: yupResolver(createCardFormSchema),
	});
	const { mutateAsync, isLoading: isCreating, isSuccess } = useCreateCardApi();

	async function handleCreateCard(data: CreateCardFieldsType) {
		await mutateAsync(data);

		if (isSuccess) {
			router.push('/');
		}
	}

	function handleCancel() {
		router.push('/');
	}

	return {
		availableCardsOptions: AVAILABLE_CARDS_OPTIONS,
		handleCancel,
		handleCreateCard,
		isCreatingCard: isCreating,
		formSchema,
	};
}
