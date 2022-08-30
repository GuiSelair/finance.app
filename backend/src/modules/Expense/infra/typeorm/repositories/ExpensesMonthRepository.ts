import { Repository, getRepository } from 'typeorm';
import ICreateExpenseMonth from '../../../dtos/ICreateExpenseInMonth';
import IExpensesMonthRepository from '../../../repositories/IExpensesInMonthRepository';
import Expense from '../entities/Expense';
import ExpenseMonth from '../entities/ExpenseInMonth';

class ExpensesMonthRepository implements IExpensesMonthRepository {
  private repository: Repository<ExpenseMonth>;

  constructor() {
    this.repository = getRepository(ExpenseMonth);
  }

  public async create(expense: Expense): Promise<ExpenseMonth[]> {
    const expenseMonthList = [] as ICreateExpenseMonth[];
    const value = expense.amount / expense.parcel;

    // eslint-disable-next-line no-plusplus
    for (let parcel = 1; parcel <= expense.parcel; parcel++) {
      const month = expense.purchase_date.getMonth() + parcel;

      expenseMonthList.push({
        expense_id: expense.id,
        number_current_of_parcel: parcel,
        number_total_of_parcel: expense.parcel,
        value_of_parcel: value,
        month,
      });
    }

    const expenseMonth = this.repository.create(expenseMonthList);
    await this.repository.save(expenseMonth);

    return expenseMonth;
  }

  public async findByMonth(month: number): Promise<ExpenseMonth[]> {
    const expensesInMonth = await this.repository.find({
      where: {
        month,
      },
    });

    return expensesInMonth;
  }
}

export default ExpensesMonthRepository;
