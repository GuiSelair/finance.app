import { useContextSelector } from 'use-context-selector';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import type { IExpensesSummary } from '@/pages/home/components/Summary';
import { httpClient } from '@/providers/HTTPClient';
import { selectedMonthYearContext } from '@/contexts';

export function useFetchExpensesSummaryApi() {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useQuery(
		['summary', month, year],
		async () => {
			const response = await httpClient.get<IExpensesSummary>('/expenses/balance', {
				params: {
					month,
					year,
				},
			});

			return response.data;
		},
		{
			onError: () => {
				toast.error('Não foi possível carregar o resumo de despesas do mês. Tente novamente mais tarde.');
			},
		},
	);
}
