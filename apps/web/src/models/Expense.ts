import { parseIsoTODate } from '@/helpers/dateFormat';
import { formatCurrency } from '@/helpers/formatCurrency';

import { Card } from './Card';

export interface ExpenseProps {
	id: string;
	name: string;
	amount: number;
	cardId: string;
	card: Card;
	userId: string;
	parcel: number;
	description?: string;
	purchaseDate?: string;
	dueDate?: string;
	isSplitedExpense?: boolean;
	isRecurring?: boolean;
	shareWith?: string;
	valueOfEach?: string;

	createdAt: string;
	updatedAt: string;
}

export class Expense {
	id: string;
	name: string;
	amount: number;
	isSplitedExpense: boolean;
	isRecurring: boolean;
	card: Card;
	userId: string;
	parcel: number;
	description?: string;
	purchaseDate?: Date;
	dueDate?: Date;
	amountFormatted?: string;
	sharedWith?: string;
	valueOfEach?: string;
	createdAt?: Date;

	constructor(data: ExpenseProps) {
		this.id = data.id;
		this.name = data.name;
		this.description = data.description ?? undefined;
		this.purchaseDate = parseIsoTODate(data.purchaseDate);
		this.dueDate = parseIsoTODate(data.dueDate);
		this.amount = Number(data.amount);
		this.amountFormatted = formatCurrency(Number(data.amount));
		this.isSplitedExpense = data.isSplitedExpense ?? false;
		this.isRecurring = data.isRecurring ?? false;
		this.userId = data.userId;
		this.card = data.card;
		this.parcel = Number(data.parcel);
		this.sharedWith = data.shareWith ?? undefined;
		this.valueOfEach = data.valueOfEach ?? undefined;
		this.createdAt = parseIsoTODate(data.createdAt);
	}
}
