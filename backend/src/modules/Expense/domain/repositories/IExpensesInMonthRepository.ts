import { ExpenseMonthMapper } from '../../infra/typeorm/entities/ExpenseMonthMapper';
import { ExpenseMonth } from '../models/ExpenseMonth';

export interface IExpensesMonthRepository {
  create(args: ExpenseMonth[]): Promise<ExpenseMonthMapper[]>;
  findByMonthAndYear(
    month: number,
    year: number,
    user_id?: string,
  ): Promise<ExpenseMonthMapper[] | undefined>;
}
