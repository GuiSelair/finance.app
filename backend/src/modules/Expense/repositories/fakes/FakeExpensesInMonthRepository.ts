import ExpenseInMonth from '../../infra/typeorm/entities/ExpenseInMonth';
import ICreateExpenseInMonth from '../../dtos/ICreateExpenseInMonth';
import IExpensesInMonthRepository from '../IExpensesInMonthRepository';

class FakeExpensesRepository implements IExpensesInMonthRepository {
  private repository: ExpenseInMonth[] = [];

  public async create({
    month,
    expense_id,
    number_current_of_parcel,
    number_total_of_parcel,
    value_of_parcel,
  }: ICreateExpenseInMonth): Promise<ExpenseInMonth[]> {
    const expenseInMonth = new ExpenseInMonth();

    Object.assign(expenseInMonth, {
      month,
      expense_id,
      number_current_of_parcel,
      number_total_of_parcel,
      value_of_parcel,
    });

    this.repository.push(expenseInMonth);

    return this.repository.filter(expense => expense.id === expense_id);
  }

  public async findByMonth(month: number): Promise<ExpenseInMonth[]> {
    return this.repository.filter(expense => expense.month === month);
  }
}

export default FakeExpensesRepository;
