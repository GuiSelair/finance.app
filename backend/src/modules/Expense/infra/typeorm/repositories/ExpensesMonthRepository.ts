import { Repository, getRepository } from 'typeorm';
import ICreateExpenseMonth from '../../../dtos/ICreateExpenseMonth';
import IExpensesMonthRepository from '../../../repositories/IExpensesMonthRepository';
import Expense from '../entities/Expense';
import ExpenseMonth from '../entities/ExpenseMonth';

class ExpensesMonthRepository implements IExpensesMonthRepository {
  private repository: Repository<ExpenseMonth>;

  private expenseMonthList: ICreateExpenseMonth[] = [];

  constructor() {
    this.repository = getRepository(ExpenseMonth);
  }

  public async create(expense: Expense): Promise<ExpenseMonth[]> {
    for (let parcel = 1; parcel <= expense.parcel; parcel++) {
      const value = expense.amount / expense.parcel;
      const month = expense.purchase_date.getMonth() + parcel;

      this.expenseMonthList.push({
        expense_id: expense.id,
        number_current_of_parcel: parcel,
        number_total_of_parcel: expense.parcel,
        value_of_parcel: value,
        month,
      });
    }
    const expenseMonth = this.repository.create(this.expenseMonthList);

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
