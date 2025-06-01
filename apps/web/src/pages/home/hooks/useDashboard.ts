/* eslint-disable react-hooks/rules-of-hooks */
import { useContextSelector } from 'use-context-selector';

import { selectedMonthYearContext } from '@/contexts';
import { useFetchExpensesSummaryApi } from '@/hooks/api/expenses/useFetchExpensesSummary.api';
import { useFetchExpensesMonthApi } from '@/hooks/api/expenses/useFetchExpensesMonth.api';
import { useDeleteExpenseApi, UseDeleteExpenseApiInput } from '@/hooks/api/expenses/useDeleteExpense.api';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';

import type { IFetchSummaryResponse } from '../components/Summary';

export type DeleteExpenseFunction = () => {
	isDeleting: boolean;
	executeDelete: (args: UseDeleteExpenseApiInput) => Promise<void>;
};

export type FetchExpensesFunction = () => {
	isFetchingExpenses: boolean;
	expensesInMonth?: ExpenseInMonth[] | undefined;
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

	const fetchExpenses: FetchExpensesFunction = () => {
		const { data, isLoading } = useFetchExpensesMonthApi();

		return {
			expensesInMonth: data,
			isFetchingExpenses: isLoading,
		};
	};

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
