/* eslint-disable react-hooks/rules-of-hooks */
import { useContextSelector } from 'use-context-selector';
import { useSearchParams } from 'next/navigation';

import { selectedMonthYearContext } from '@/contexts';
import { useFetchExpensesSummaryApi } from '@/hooks/api/expenses/useFetchExpensesSummary.api';
import { useFetchExpensesMonthApi } from '@/hooks/api/expenses/useFetchExpensesMonth.api';
import { useDeleteExpenseApi, UseDeleteExpenseApiInput } from '@/hooks/api/expenses/useDeleteExpense.api';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';

import type { IFetchSummaryResponse } from '../components/Summary';
import { EExpensesTypesFilter, EXPENSES_FILTERS } from '../constants/expensesFilters';

export type DeleteExpenseFunction = () => {
	isDeleting: boolean;
	executeDelete: (args: UseDeleteExpenseApiInput) => Promise<void>;
};

export type FetchExpensesFunction = () => {
	isFetchingExpenses: boolean;
	expensesInMonth?: ExpenseInMonth[] | undefined;
};

export function useDashboard() {
	const searchParams = useSearchParams();
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

		if (checkIfHasFilters()) {
			const expensesFiltered = makeExpensesFiltered(data || []);

			return {
				expensesInMonth: expensesFiltered,
				isFetchingExpenses: isLoading,
			};
		}

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

	function makeExpensesFiltered(expenses: ExpenseInMonth[]) {
		let expensesFiltered = expenses;
		const filters = getFiltersValues();

		if (filters?.cards) {
			expensesFiltered = expensesFiltered?.filter(expense => filters.cards.includes(expense.expense.card.slug));
		}

		if (filters?.expenses) {
			switch (filters.expenses) {
				case EExpensesTypesFilter.UNIQUE:
					expensesFiltered = expensesFiltered?.filter(expense => expense.quantityParcel === 1);
					break;
				case EExpensesTypesFilter.MULTIPLE:
					expensesFiltered = expensesFiltered?.filter(expense => expense.quantityParcel > 1);
					break;
				case EExpensesTypesFilter.FIXED:
					expensesFiltered = expensesFiltered?.filter(expense => expense.expense.isRecurring);
					break;
			}
		}

		if (filters?.search) {
			expensesFiltered = expensesFiltered?.filter(expense =>
				expense.expense.name.toLowerCase().includes(String(filters.search).toLowerCase()),
			);
		}

		return expensesFiltered;
	}

	function checkIfHasFilters() {
		return EXPENSES_FILTERS.some(filter => searchParams.get(filter));
	}

	function getFiltersValues() {
		return EXPENSES_FILTERS.reduce((acc, filter) => {
			if (searchParams.has(filter)) {
				acc[filter] = ['search', 'expenses'].includes(filter)
					? searchParams.get(filter)!
					: searchParams.get(filter)!.split(',');
			}
			return acc;
		}, {} as Record<string, string | string[]>);
	}

	return {
		handleRestoreToCurrentMonthAndYear,
		handleSelectMonthAndYear,
		fetchSummaryExpenses,
		fetchExpenses,
		deleteExpense,
	};
}
