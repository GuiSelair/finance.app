import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useContextSelector } from 'use-context-selector';

import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { httpClient } from '@/providers/HTTPClient';
import { selectedMonthYearContext } from '@/contexts';
import { makeExpenseModel, RawExpensesMonth } from '@/helpers/mappers/makeExpenseModel';

export type FetchExpensesResponse = UseQueryResult<ExpenseInMonth[], unknown>;

export function useFetchExpensesMonthApi() {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useQuery(['month-expenses', month, year], async () => {
		try {
			const response = await httpClient.get<RawExpensesMonth[]>('/expenses/fetch', {
				params: {
					month,
					year,
				},
			});

			return response.data.map(rawExpenseMonth => makeExpenseModel(rawExpenseMonth));
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorFromServer = error.response?.data;

				toast.error('Aconteceu um erro inesperado. Por favor, tente novamente...', {
					position: 'bottom-left',
					theme: 'colored',
				});
				throw new Error(errorFromServer.error);
			}
		}
	});
}
