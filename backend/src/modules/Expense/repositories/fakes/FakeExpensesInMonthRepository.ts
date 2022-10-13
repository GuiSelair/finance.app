import ExpenseInMonth from '../../infra/typeorm/entities/ExpenseInMonth';
import ICreateExpenseInMonth from '../../dtos/ICreateExpenseInMonth';
import IExpensesInMonthRepository from '../IExpensesInMonthRepository';

class FakeExpensesRepository implements IExpensesInMonthRepository {
  public repository: ExpenseInMonth[] = [];

  public async create(
    expenseMonthList: ICreateExpenseInMonth[],
  ): Promise<ExpenseInMonth[]> {
    expenseMonthList.forEach(expense => {
      const expenseInMonth = new ExpenseInMonth();
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

  public async findByMonthAndYear(
    month: number,
    year: number,
  ): Promise<ExpenseInMonth[]> {
    return this.repository.filter(
      expense => expense.month === month && expense.year === year,
    );
  }
}

export default FakeExpensesRepository;
