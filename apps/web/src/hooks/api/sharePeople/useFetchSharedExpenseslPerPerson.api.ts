import { useQuery, UseQueryOptions } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { httpClient } from '@/providers/HTTPClient';
import { selectedMonthYearContext } from '@/contexts';

interface FetchSharedExpensesByPersonHttpResponse {
	expenses_shared_details: {
		id: 1;
		name: 'Despesa compartilhada';
		current_parcel: 1;
		total_parcel: 1;
		amount: 50;
	}[];
}

export interface UseFetchSharedExpensesByPersonApiOutput {
	expensesSharedDetails: {
		id: number;
		name: string;
		currentParcel: number;
		totalParcel: number;
		amount: number;
	}[];
}

export function useFetchSharedExpensesByPersonApi(
	personId?: number | null,
	options?: UseQueryOptions<UseFetchSharedExpensesByPersonApiOutput, Error>,
) {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useQuery({
		queryKey: ['shared-expenses-by-person', personId, month, year],
		queryFn: async () => {
			const response = await httpClient.get<FetchSharedExpensesByPersonHttpResponse>(
				'/expenses/fetch-shared-by-person',
				{
					params: {
						person_id: personId,
						month,
						year,
					},
				},
			);
			const { expenses_shared_details: sharedExpensesDetails } = response.data;

			return {
				expensesSharedDetails: sharedExpensesDetails.map(expense => ({
					id: expense.id,
					name: expense.name,
					currentParcel: expense.current_parcel,
					totalParcel: expense.total_parcel,
					amount: expense.amount,
				})),
			};
		},
		...options,
	});
}
