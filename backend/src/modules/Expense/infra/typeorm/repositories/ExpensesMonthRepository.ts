import { Repository, getRepository } from 'typeorm';
import ICreateExpenseInMonth from '../../../dtos/ICreateExpenseInMonth';

import IExpensesMonthRepository from '../../../repositories/IExpensesInMonthRepository';
import ExpenseMonth from '../entities/ExpenseInMonth';

class ExpensesMonthRepository implements IExpensesMonthRepository {
  private repository: Repository<ExpenseMonth>;

  constructor() {
    this.repository = getRepository(ExpenseMonth);
  }

  public async create(
    expenseMonthList: ICreateExpenseInMonth[],
  ): Promise<ExpenseMonth[]> {
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
