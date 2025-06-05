export const EXPENSES_FILTERS = ['search', 'cards', 'expenses'] as const;
export enum EExpensesTypesFilter {
	UNIQUE = 'unique',
	MULTIPLE = 'multiple',
	FIXED = 'fixed',
}
