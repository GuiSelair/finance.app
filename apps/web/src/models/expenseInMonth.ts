import { Expense } from './expense';

export interface ExpenseInMonth {
	id: string;
	expense_id: string;
	number_current_of_parcel: number;
	number_total_of_parcel: number;
	month: number;
	year: number;
	value_of_parcel: number;
	isPaid: boolean;
	created_at: string;
	updated_at: string;
	expense: Expense;
}
