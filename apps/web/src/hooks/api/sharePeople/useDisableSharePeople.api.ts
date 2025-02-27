import { toast } from 'react-toastify';
import { useMutation } from 'react-query';

import { SharePeopleFormType } from '@/pages/registrations/share-people/constants/formSchema';
import { httpClient } from '@/providers/HTTPClient';

export type DisableSharePeopleInput = SharePeopleFormType & { id: number };

export function useDisableSharePeopleApi() {
	return useMutation({
		mutationFn: async (id: number) => {
			await httpClient.delete(`/share-people/${id}`);
		},
		onSuccess: () => {
			toast.success('Pessoa desabilitada com sucesso!');
		},
		onError: () => {
			toast.error('Não foi possível desabilitar a pessoa divisora. Verifique os dados e tente novamente.');
		},
	});
}
