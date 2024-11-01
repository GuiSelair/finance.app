import { useQuery, UseQueryResult } from 'react-query';

import { httpClient } from '@/providers/HTTPClient';

import { makeExpenseModel, RawExpensesMonth } from '@/helpers/mappers/makeExpenseModel';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';

interface FindExpenseResponse {
	expense: RawExpensesMonth;
}

export type UseFindExpenseApiOptionsInput = { ignoreInitialFetch?: boolean };
export type UseFindExpenseApiOutput = UseQueryResult<ExpenseInMonth, unknown>;

export function useFindExpenseApi(expenseId: string, { ignoreInitialFetch = false }: UseFindExpenseApiOptionsInput) {
	return useQuery(
		['expense', expenseId],
		async ({ queryKey }) => {
			const [, id] = queryKey;
			const response = await httpClient.get<FindExpenseResponse>(`/expenses/${id}/details`);

			const rawExpenseMonth = response?.data?.expense;

			return makeExpenseModel(rawExpenseMonth);
		},
		{
			enabled: !ignoreInitialFetch,
		},
	);
}
