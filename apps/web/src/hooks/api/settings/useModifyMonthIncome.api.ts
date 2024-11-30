import { useMutation, useQueryClient } from 'react-query';
import { useContextSelector } from 'use-context-selector';
import { toast } from 'react-toastify';

import { selectedMonthYearContext } from '@/contexts';
import { httpClient } from '@/providers/HTTPClient';

interface ModifyMonthIncomeMutationProps {
	income: number;
}

export function useModifyMonthIncomeApi() {
	const queryClient = useQueryClient();

	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useMutation({
		mutationKey: ['month-income', month, year],
		mutationFn: async (data: ModifyMonthIncomeMutationProps) => {
			await httpClient.post('/settings/incomes', {
				body: {
					month,
					year,
					income: data.income,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['summary', month, year],
				exact: true,
			});
		},
		onError: () => {
			toast.error('Não foi possível modificar o valor de entrada desse mês. Atualize a página e tente novamente.');
		},
	});
}
