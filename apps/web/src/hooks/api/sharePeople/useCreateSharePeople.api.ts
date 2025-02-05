import { removeInputMasks } from '@/constants/inputMasks';
import { SharePeopleFormType } from '@/pages/registrations/share-people/constants/formSchema';
import { httpClient } from '@/providers/HTTPClient';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export type CreateSharePeopleInput = SharePeopleFormType;

export function useCreateSharePeopleApi() {
	return useMutation({
		mutationFn: async (formData: CreateSharePeopleInput) => {
			await httpClient.post('/share-people', {
				body: {
					name: formData.name,
					whatsapp: removeInputMasks.removePHONEMask(formData.whatsapp),
					day_to_send_message: formData.betterDayToSendInvoice.value,
				},
			});
		},
		onSuccess: () => {
			toast.success('Pessoa cadastrada com sucesso!');
		},
		onError: () => {
			toast.error('Não foi possível cadastrar uma nova pessoa. Verifique os dados e tente novamente.');
		},
	});
}
