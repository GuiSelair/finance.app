/* eslint-disable react-hooks/rules-of-hooks */
import { useContextSelector } from 'use-context-selector';

import { selectedMonthYearContext } from '@/contexts';
import { useFetchExpensesSummaryApi } from '@/hooks/api/expenses/useFetchExpensesSummary.api';
import { useFetchExpensesMonthApi } from '@/hooks/api/expenses/useFetchExpensesMonth.api';
import { useDeleteExpenseApi, UseDeleteExpenseApiInput } from '@/hooks/api/expenses/useDeleteExpense.api';

import type { IFetchSummaryResponse } from '../components/Summary';
import type { IFetchExpensesResponse } from '../components/ExpensesTable';

export type DeleteExpenseFunction = () => {
	isDeleting: boolean;
	executeDelete: (args: UseDeleteExpenseApiInput) => Promise<void>;
};

export function useDashboard() {
	const handleRestoreToCurrentMonthAndYear = useContextSelector(
		selectedMonthYearContext,
		ctx => ctx.handleRestoreToCurrentMonthAndYear,
	);
	const handleSelectMonthAndYear = useContextSelector(selectedMonthYearContext, ctx => ctx.handleSelectMonthAndYear);

	function fetchSummaryExpenses(): IFetchSummaryResponse {
		const { data, isLoading, isError } = useFetchExpensesSummaryApi();

		return {
			summary: data,
			isLoading,
			isError,
		};
	}

	function fetchExpenses(): IFetchExpensesResponse {
		const { data, isLoading } = useFetchExpensesMonthApi();

		return {
			expensesInMonth: data,
			isFetchingExpenses: isLoading,
		};
	}

	const deleteExpense: DeleteExpenseFunction = () => {
		const { mutateAsync, isLoading } = useDeleteExpenseApi();

		return {
			isDeleting: isLoading,
			executeDelete: mutateAsync as (args: UseDeleteExpenseApiInput) => Promise<void>,
		};
	};

	return {
		handleRestoreToCurrentMonthAndYear,
		handleSelectMonthAndYear,
		fetchSummaryExpenses,
		fetchExpenses,
		deleteExpense,
	};
}
