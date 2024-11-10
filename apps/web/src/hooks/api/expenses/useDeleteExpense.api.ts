import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';

export interface UseDeleteExpenseApiInput {
	expenseId: string;
	/** Define se será excluido uma parcela especifica ou todas. Apesar de ser um boolean, o valor trafegado é 0 ou 1 porque é um valor
	 * de query params da url.
	 */
	isDeleteOne?: 0 | 1;
}

export function useDeleteExpenseApi() {
	const queryClient = useQueryClient();
	return useMutation(
		async ({ expenseId, isDeleteOne = 0 }: UseDeleteExpenseApiInput) => {
			const { data } = await httpClient.delete(`/expenses/${expenseId}?is_only_one=${isDeleteOne}`);
			if (!data) throw new Error('Erro ao deletar despesa.');
		},
		{
			onError: () => {
				toast.error('Erro ao deletar despesa. Atualize a página e tente novamente.');
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries();
				toast.success('Despesa removida com sucesso!');
			},
		},
	);
}
