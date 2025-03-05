import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

import { removeInputMasks } from '@/constants/inputMasks';
import { SharePeopleFormType } from '@/pages/registrations/share-people/constants/formSchema';
import { httpClient } from '@/providers/HTTPClient';

export type EditSharePeopleInput = SharePeopleFormType & { id: number };

export function useEditSharePeopleApi() {
	return useMutation({
		mutationFn: async (formData: EditSharePeopleInput) => {
			await httpClient.put(`/share-people/${formData.id}`, {
				body: {
					name: formData.name,
					whatsapp: removeInputMasks.removePHONEMask(formData.whatsapp),
					day_to_send_message: formData.betterDayToSendInvoice.value,
				},
			});
		},
		onSuccess: () => {
			toast.success('Pessoa editada com sucesso!');
		},
		onError: () => {
			toast.error('Não foi possível editar a pessoa divisora. Verifique os dados e tente novamente.');
		},
	});
}
