import { parseIsoTODate } from '@/helpers/dateFormat';

import { Expense } from './Expense';
import { SharedExpense } from './SharedExpense';

export interface ExpenseInMonthProps {
	id: string;
	expenseId: string;
	expense: Expense;
	sharedExpenses?: SharedExpense[];
	currentParcel: number;
	quantityParcel: number;
	valueParcel: number;
	month: number;
	year: number;
	isPaid?: boolean;
	createdAt: string;
}

export class ExpenseInMonth {
	id: string;
	expenseId: string;
	expense: Expense;
	sharedExpenses?: SharedExpense[] | null;
	currentParcel: number;
	quantityParcel: number;
	valueParcel: number;
	month: number;
	year: number;
	isPaid: boolean;
	createdAt?: Date;

	constructor(data: ExpenseInMonthProps) {
		this.id = data.id;
		this.expenseId = data.expenseId;
		this.expense = data.expense;
		this.currentParcel = data.currentParcel;
		this.quantityParcel = data.quantityParcel;
		this.valueParcel = Number(data.valueParcel);
		this.month = Number(data.month);
		this.year = Number(data.year);
		this.isPaid = data.isPaid ?? false;
		this.createdAt = parseIsoTODate(data.createdAt);
		this.sharedExpenses = data.sharedExpenses ?? null;
	}
}
