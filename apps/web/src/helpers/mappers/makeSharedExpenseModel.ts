import { SharedExpense } from '@/models/SharedExpense';

export interface RawSharedExpense {
	id: number;
	name: string;
	total_value: number;
	month: number;
	year: number;
}

export function makeSharedExpenseModel(rawSharedExpense: RawSharedExpense) {
	return new SharedExpense({
		person: {
			id: rawSharedExpense.id,
			name: rawSharedExpense.name,
		},
		total: rawSharedExpense.total_value,
		month: rawSharedExpense.month,
		year: rawSharedExpense.year,
	});
}
