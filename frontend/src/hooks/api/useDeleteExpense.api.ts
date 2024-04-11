import { UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';

export function useDeleteExpenseApi(expenseId: string): UseMutationResult {
	const queryClient = useQueryClient();
	return useMutation(
		async () => {
			await httpClient.delete(`/expenses/${expenseId}`);
		},
		{
			onError: () => {
				toast.error(
					'Erro ao deletar despesa. Atualize a página e tente novamente.',
				);
			},
			onSuccess: async () => {
				await queryClient.invalidateQueries();
				toast.success('Despesa removida com sucesso!');
			},
		},
	);
}
