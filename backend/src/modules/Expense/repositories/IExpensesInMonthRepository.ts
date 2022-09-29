import ICreateExpenseInMonth from '../dtos/ICreateExpenseInMonth';
import ExpenseInMonth from '../infra/typeorm/entities/ExpenseInMonth';

export default interface IExpensesInMonthRepository {
  create(args: ICreateExpenseInMonth[]): Promise<ExpenseInMonth[]>;
  findByMonthAndYear(
    month: number,
    year: number,
    userId: string,
  ): Promise<ExpenseInMonth[]>;
}
