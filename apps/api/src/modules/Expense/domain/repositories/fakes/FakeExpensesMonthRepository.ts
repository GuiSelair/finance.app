import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper';
import { IExpensesMonthRepository } from '../IExpensesInMonthRepository';
import { Expense } from '../../models/Expense';
import { ExpenseMonth } from '../../models/ExpenseMonth';

export class FakeExpensesMonthRepository implements IExpensesMonthRepository {
  public repository: ExpenseMonthMapper[] = [];

  public async create(expenseMonthList: ExpenseMonth[]): Promise<ExpenseMonthMapper[]> {
    expenseMonthList.forEach(expense => {
      const expenseInMonth = new ExpenseMonthMapper();
      Object.assign(expenseInMonth, {
        month: expense.month,
        year: expense.year,
        expense_id: expense.expense_id,
        number_current_of_parcel: expense.number_current_of_parcel,
        number_total_of_parcel: expense.number_total_of_parcel,
        value_of_parcel: expense.value_of_parcel,
      });

      this.repository.push(expenseInMonth);
    });

    return this.repository;
  }

  public async fetchByMonthAndYear(
    month: number,
    year: number,
    user_id?: string,
  ): Promise<ExpenseMonthMapper[]> {
    return this.repository.filter(
      expense =>
        expense.month === month && expense.year === year && expense.expense.user_id === user_id,
    );
  }
}
