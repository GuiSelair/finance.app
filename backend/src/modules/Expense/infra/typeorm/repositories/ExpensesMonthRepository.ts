import { Repository } from 'typeorm';

import { ConnectionSource } from '@shared/infra/typeorm/bootstrap';
import ICreateExpenseInMonth from '../../../domain/dtos/ICreateExpenseInMonth';
import IExpensesMonthRepository from '../../../domain/repositories/IExpensesInMonthRepository';
import ExpenseMonth from '../entities/ExpenseInMonth';

class ExpensesMonthRepository implements IExpensesMonthRepository {
  private repository: Repository<ExpenseMonth>;

  constructor() {
    this.repository = ConnectionSource.getRepository(ExpenseMonth);
  }

  public async create(expenseMonthList: ICreateExpenseInMonth[]): Promise<ExpenseMonth[]> {
    const expenseMonth = this.repository.create(expenseMonthList);
    await this.repository.save(expenseMonth);

    return expenseMonth;
  }

  public async findByMonthAndYear(
    month: number,
    year: number,
    userId?: string,
  ): Promise<ExpenseMonth[]> {
    const expensesInMonth = await this.repository.find({
      where: {
        month,
        year,
        ...(userId && {
          expense: {
            user_id: userId,
          },
        }),
      },
      relations: ['expense', 'expense.card'],
    });

    return expensesInMonth;
  }
}

export default ExpensesMonthRepository;
