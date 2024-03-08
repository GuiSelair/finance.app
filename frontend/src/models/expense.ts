import { Card } from './Card';

export interface Expense {
	id: string;
	name: string;
	description?: string;
	purchase_date: string;
	due_date: string;
	amount: number;
	split_expense: boolean;
	is_recurring: boolean;
	share_with: string;
	value_of_each: string;
	card_id: string;
	card: Card;
	user_id: string;
	parcel: number;
	created_at: string;
	updated_at: string;
}
