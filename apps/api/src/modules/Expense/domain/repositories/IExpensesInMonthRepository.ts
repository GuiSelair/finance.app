import { ExpenseMonthMapper } from '../../infra/typeorm/entities/ExpenseMonthMapper';
import { ExpenseMonth } from '../models/ExpenseMonth';

export type FindByIdInput = { id: string, user_id: string };
export type FindByIdOutput = ExpenseMonthMapper | undefined;

export interface IExpensesMonthRepository {
  create(args: ExpenseMonth[]): Promise<ExpenseMonthMapper[]>;
  fetchByMonthAndYear(
    month: number,
    year: number,
    user_id?: string,
  ): Promise<ExpenseMonthMapper[] | undefined>;
  findById(args: FindByIdInput): Promise<FindByIdOutput>;
}
