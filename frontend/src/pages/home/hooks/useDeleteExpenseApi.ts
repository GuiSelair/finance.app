import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

import { ExpenseService } from '@/services/http/expenseService';
import { toast } from 'react-toastify';

export function useDeleteExpenseApi(expenseId: string): UseMutationResult {
	const queryClient = useQueryClient();
	return useMutation(
		async () => {
			await ExpenseService.deleteExpense(expenseId);
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
