import { ExpenseMapper } from '../../infra/typeorm/entities/ExpenseMapper';
import { Expense } from '../models/Expense';

export type UpdateExpenseInput = { id: string; data: Partial<Expense> };
export type RemoveExpenseInput = { id: string };

export type FindByIdInput = { id: string, user_id: string };

export interface IExpensesRepository {
  create(args: Expense): Promise<ExpenseMapper>;
  fetch(userId: string): Promise<ExpenseMapper[] | null>;
  fetchRecurringExpenses(): Promise<ExpenseMapper[] | undefined>;
  findById(args: FindByIdInput): Promise<ExpenseMapper | null>;
  remove(args: RemoveExpenseInput): Promise<boolean>;
  update(args: UpdateExpenseInput): Promise<void>;
}
