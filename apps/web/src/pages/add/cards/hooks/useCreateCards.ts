import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

import { httpClient } from '@/providers/HTTPClient';

import { AVAILABLE_CARDS_OPTIONS } from '../constants/availableCardsOptions';
import { ICreateCardFields } from '../constants/formSchema';
import { AxiosError } from 'axios';

export function useCreateCards() {
	const router = useRouter();
	const createCardMutation = useMutation(
		['cards'],
		async (data: ICreateCardFields) => {
			await httpClient.post('/cards', {
				body: {
					name: data.name,
					flag: data.flag.value,
					due_day: data.dueDay,
					turning_day: data.turningDay,
				},
			});
		},
	);

	async function handleCreateCard(data: ICreateCardFields) {
		await createCardMutation.mutateAsync(data, {
			onError: error => {
				if (error instanceof AxiosError) {
					if (
						error.response?.data.message ===
						'Impossible create two cards with same name'
					) {
						toast.error(
							'Já existe um cartão com esse apelido! Escolha outro e tente novamente.',
						);
						return;
					}
				}
				toast.error(
					'Erro no cadastro do cartão! Atualize a página e tente novamente.',
				);
			},
			onSuccess: () => {
				toast.success('Cartão cadastrado com sucesso!');
				router.push('/');
			},
		});
	}

	function handleCancel() {
		router.push('/');
	}

	return {
		availableCardsOptions: AVAILABLE_CARDS_OPTIONS,
		handleCancel,
		handleCreateCard,
		isCreatingCard: createCardMutation.isLoading,
	};
}
