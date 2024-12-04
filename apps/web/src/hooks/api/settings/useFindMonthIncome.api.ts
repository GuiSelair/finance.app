import { useQuery } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { selectedMonthYearContext } from '@/contexts';
import { Income } from '@/models/Income';
import { httpClient } from '@/providers/HTTPClient';

interface FindMonthIncomeApiResponse {
	income: {
		id: number;
		income: number;
		month: number;
		year: number;
		user_id: string;
		created_at: string;
	};
}

type UseFindMonthIncomeApiOptionsInput = { ignoreInitialFetch?: boolean };

export function useFindMonthIncomeApi({ ignoreInitialFetch = false }: UseFindMonthIncomeApiOptionsInput = {}) {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useQuery({
		queryKey: ['month-income', month, year],
		queryFn: async () => {
			const apiResponse = await httpClient.get<FindMonthIncomeApiResponse>('/settings/incomes', {
				params: {
					month,
					year,
				},
			});

			const { income: incomeReceived } = apiResponse.data;

			return {
				income: incomeReceived
					? new Income({
							income: incomeReceived.income,
							year: incomeReceived.year,
							month: incomeReceived.month,
							createdAt: incomeReceived.created_at,
					  })
					: null,
			};
		},
		enabled: !ignoreInitialFetch,
	});
}
