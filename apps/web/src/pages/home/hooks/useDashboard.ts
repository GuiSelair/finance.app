/* eslint-disable react-hooks/rules-of-hooks */
import { useContextSelector } from 'use-context-selector';

import { selectedMonthYearContext } from '@/contexts';
import { useFetchExpensesSummaryApi } from '@/hooks/api/useFetchExpensesSummary.api';
import { useFetchExpensesMonthApi } from '@/hooks/api/useFetchExpensesMonth.api';
import { useDeleteExpenseApi } from '@/hooks/api/useDeleteExpense.api';

import type { IFetchSummaryResponse } from '../components/Summary';
import type { IFetchExpensesResponse } from '../components/ExpensesTable';
import type { IDeleteExpenseResponse } from '../components/ExpenseDetailsModal';

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

	function deleteExpense(expenseId: string): IDeleteExpenseResponse {
		const { mutateAsync, isLoading } = useDeleteExpenseApi(expenseId);

		return {
			isDeleting: isLoading,
			executeDelete: mutateAsync as () => Promise<void>,
		};
	}

	return {
		handleRestoreToCurrentMonthAndYear,
		handleSelectMonthAndYear,
		fetchSummaryExpenses,
		fetchExpenses,
		deleteExpense,
	};
}
