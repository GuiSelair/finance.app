export interface Expense {
	id: string;
	name: string;
	description?: string;
	purchase_date: string;
	due_date: string;
	amount: number;
	split_expense: boolean;
	share_with: string;
	value_of_each: string;
	card_id: string;
	user_id: string;
	parcel: number;
	created_at: string;
	updated_at: string;
}
