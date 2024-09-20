import { httpClient } from '@/providers/HTTPClient';

export async function deleteExpense(expenseId: string): Promise<void> {
	httpClient.delete(`/expenses/${expenseId}`);
}
