import { useQuery, UseQueryOptions } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { makeSharedExpenseModel, RawSharedExpense } from '@/helpers/mappers/makeSharedExpenseModel';
import { httpClient } from '@/providers/HTTPClient';
import { SharedExpense } from '@/models/SharedExpense';
import { selectedMonthYearContext } from '@/contexts';

interface FetchTotalPerPersonHttpResponse {
	people: RawSharedExpense[];
}

export function useFetchTotalPerPersonApi(options?: UseQueryOptions<SharedExpense[], Error>) {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useQuery({
		queryKey: ['total-per-person', month, year],
		queryFn: async () => {
			const response = await httpClient.get<FetchTotalPerPersonHttpResponse>(
				'/expenses/fetch-shared-totalizer-by-person',
				{
					params: {
						month,
						year,
					},
				},
			);
			const { people: totalPerPersonList } = response.data;

			return (
				totalPerPersonList?.map(totalPerPerson => makeSharedExpenseModel({ ...totalPerPerson, month, year })) || []
			);
		},
		...options,
	});
}
