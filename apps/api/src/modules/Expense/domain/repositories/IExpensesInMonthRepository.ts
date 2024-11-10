import { ExpenseMonthMapper } from '../../infra/typeorm/entities/ExpenseMonthMapper';
import { ExpenseMonth } from '../models/ExpenseMonth';

export type FindByIdInput = { id: string, user_id: string };
export type FindByIdOutput = ExpenseMonthMapper | undefined;
export type UpdateExpenseMonthInput = {
  id: string;
  data: Partial<ExpenseMonth>;
}
export type RemoveExpenseMonthInput = { id: string };
export type FetchByExpenseIdInput = { expense_id?: string };
export type FetchByExpenseIdOutput = [ExpenseMonthMapper[] | undefined, number];

export interface IExpensesMonthRepository {
  create(args: ExpenseMonth[]): Promise<ExpenseMonthMapper[]>;
  fetchByMonthAndYear(
    month: number,
    year: number,
    user_id?: string,
  ): Promise<ExpenseMonthMapper[] | undefined>;
  findById(args: FindByIdInput): Promise<FindByIdOutput>;
  fetchByExpenseId(args: FetchByExpenseIdInput): Promise<FetchByExpenseIdOutput>
  update(args: UpdateExpenseMonthInput): Promise<void>;
  remove(args: RemoveExpenseMonthInput): Promise<boolean>;
}
