import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { CreateCardFieldsType } from '@/pages/registrations/cards/constants/formSchema';
import { httpClient } from '@/providers/HTTPClient';

export function useCreateCardApi() {
	return useMutation(
		['cards'],
		async (data: CreateCardFieldsType) => {
			await httpClient.post('/cards', {
				body: {
					name: data.name,
					flag: data.flag.value,
					due_day: data.dueDay,
					turning_day: data.turningDay,
				},
			});
		},
		{
			onError: error => {
				if (error instanceof AxiosError) {
					if (error.response?.data.message === 'Impossible create two cards with same name') {
						toast.error('Já existe um cartão com esse apelido! Escolha outro e tente novamente.');
						return;
					}
				}
				toast.error('Erro no cadastro do cartão! Atualize a página e tente novamente.');
			},
			onSuccess: () => {
				toast.success('Cartão cadastrado com sucesso!');
			},
		},
	);
}
