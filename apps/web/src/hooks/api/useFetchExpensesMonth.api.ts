import { AxiosError } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { useContextSelector } from 'use-context-selector';

import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { httpClient } from '@/providers/HTTPClient';
import { selectedMonthYearContext } from '@/contexts';
import { RawCard } from './useListCards.api';
import { Expense } from '@/models/Expense';
import { Card } from '@/models/Card';

export type FetchExpensesResponse = UseQueryResult<ExpenseInMonth[], unknown>;

export interface RawExpensesMonth {
	id: string;
	expense_id: string;
	number_current_of_parcel: number;
	number_total_of_parcel: number;
	month: number;
	year: number;
	value_of_parcel: number;
	is_paid: boolean;
	created_at: string;
	updated_at: string;
	expense: RawExpense;
}

export interface RawExpense {
	id: string;
	name: string;
	description: string;
	purchase_date: string;
	due_date: string;
	amount: number;
	is_recurring: boolean;
	card_id: string;
	user_id: string;
	parcel: number;
	created_at: string;
	updated_at: string;
	card: RawCard;
}

export function useFetchExpensesMonthApi() {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useQuery(['month-expenses', month, year], async () => {
		try {
			const response = await httpClient.get<RawExpensesMonth[]>('/expenses/list', {
				params: {
					month,
					year,
				},
			});

			return response.data.map(
				rawExpenseMonth =>
					new ExpenseInMonth({
						id: rawExpenseMonth.id,
						createdAt: rawExpenseMonth.created_at,
						currentParcel: rawExpenseMonth.number_current_of_parcel,
						quantityParcel: rawExpenseMonth.number_total_of_parcel,
						expenseId: rawExpenseMonth.expense_id,
						month: rawExpenseMonth.month,
						year: rawExpenseMonth.year,
						valueParcel: rawExpenseMonth.value_of_parcel,
						isPaid: rawExpenseMonth.is_paid,
						expense: new Expense({
							id: rawExpenseMonth.expense.id,
							amount: rawExpenseMonth.expense.amount,
							cardId: rawExpenseMonth.expense.card_id,
							createdAt: rawExpenseMonth.expense.created_at,
							name: rawExpenseMonth.expense.name,
							parcel: rawExpenseMonth.expense.parcel,
							updatedAt: rawExpenseMonth.expense.updated_at,
							userId: rawExpenseMonth.expense.user_id,
							description: rawExpenseMonth.expense.description,
							dueDate: rawExpenseMonth.expense.due_date,
							isRecurring: rawExpenseMonth.expense.is_recurring,
							purchaseDate: rawExpenseMonth.expense.purchase_date,
							card: new Card({
								id: rawExpenseMonth.expense.card.id,
								name: rawExpenseMonth.expense.card.name,
								createdAt: rawExpenseMonth.expense.card.created_at,
								dueDay: rawExpenseMonth.expense.card.due_day,
								flag: rawExpenseMonth.expense.card.flag,
								turningDay: rawExpenseMonth.expense.card.turning_day,
								updatedAt: rawExpenseMonth.expense.card.updated_at,
								userId: rawExpenseMonth.expense.card.user_id,
							}),
						}),
					}),
			);
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
