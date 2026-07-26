/**
 * Tab order optimized for repeated expense entry:
 * name → value fields first; preserved fields (dates, card) last.
 */
export const CREATE_EXPENSE_TAB_ORDER = {
	name: 1,
	totalValue: 2,
	parcelQuantity: 3,
	isRecurring: 4,
	isSplit: 5,
	sharePerson: 6,
	shareAmount: 7,
	shareAdd: 8,
	purchaseDate: 9,
	manualExpenseDate: 10,
	paymentMethod: 11,
	cancel: 12,
	submit: 13,
} as const;
