import { Card } from '@/models/Card';
import { Expense } from '@/models/Expense';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { SharedExpense } from '@/models/SharedExpense';
import { RawCard } from './makeCardModel';

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
	expenses_month_share_people: RawSharedExpense[];
}

export interface RawSharedExpense {
	id: number;
	name: string;
	amount: number;
	share_expense_person: {
		id: number;
		name: string;
		whatsapp: string;
	};
}

export interface RawExpense {
	id: string;
	name: string;
	description: string;
	purchase_date: string;
	due_date: string;
	amount: number;
	is_recurring: boolean;
	is_splitted: boolean;
	card_id: string;
	user_id: string;
	parcel: number;
	created_at: string;
	updated_at: string;
	card: RawCard;
}

export function makeExpenseModel(data: RawExpensesMonth) {
	return new ExpenseInMonth({
		id: data.id,
		createdAt: data.created_at,
		currentParcel: data.number_current_of_parcel,
		quantityParcel: data.number_total_of_parcel,
		expenseId: data.expense_id,
		month: data.month,
		year: data.year,
		valueParcel: data.value_of_parcel,
		isPaid: data.is_paid,
		expense: new Expense({
			id: data.expense.id,
			amount: data.expense.amount,
			cardId: data.expense.card_id,
			createdAt: data.expense.created_at,
			name: data.expense.name,
			parcel: data.expense.parcel,
			updatedAt: data.expense.updated_at,
			userId: data.expense.user_id,
			description: data.expense.description,
			dueDate: data.expense.due_date,
			isRecurring: data.expense.is_recurring,
			isSplitedExpense: data.expense.is_splitted,
			purchaseDate: data.expense.purchase_date,
			card: new Card({
				id: data.expense.card.id,
				name: data.expense.card.name,
				createdAt: data.expense.card.created_at,
				dueDay: data.expense.card.due_day,
				flag: data.expense.card.flag,
				turningDay: data.expense.card.turning_day,
				updatedAt: data.expense.card.updated_at,
				userId: data.expense.card.user_id,
			}),
		}),
		sharedExpenses: data.expenses_month_share_people.map(expense => {
			return new SharedExpense({
				person: {
					id: expense.share_expense_person.id,
					name: expense.share_expense_person.name,
					whatsapp: expense.share_expense_person.whatsapp,
				},
				total: expense.amount,
				month: data.month,
				year: data.year,
			});
		}),
	});
}
