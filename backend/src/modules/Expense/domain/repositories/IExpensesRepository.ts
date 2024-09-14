import { ExpenseMapper } from '../../infra/typeorm/entities/ExpenseMapper';
import { Expense } from '../models/Expense';

export interface IExpensesRepository {
  create(args: Expense): Promise<ExpenseMapper>;
  fetch(userId: string): Promise<ExpenseMapper[] | null>;
  fetchRecurringExpenses(): Promise<ExpenseMapper[] | undefined>;
  findById(id: string, userId: string): Promise<ExpenseMapper | null>;
  remove(id: string): Promise<boolean>;
}
