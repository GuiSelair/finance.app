import { Repository } from 'typeorm';

import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { FindByIdInput, FindByIdOutput, IExpensesMonthRepository } from '@modules/Expense/domain/repositories/IExpensesInMonthRepository';
import { ExpenseMonthMapper } from '../entities/ExpenseMonthMapper';
import { ExpenseMonth } from '@modules/Expense/domain/models/ExpenseMonth';

export class ExpensesMonthRepository implements IExpensesMonthRepository {
  private repository: Repository<ExpenseMonthMapper>;

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(ExpenseMonthMapper);
  }

  private makeExpenseMonthMapper(input: ExpenseMonth) {
    return Object.assign(new ExpenseMonthMapper(), input);
  }

  public async create(expenseMonthList: ExpenseMonth[]): Promise<ExpenseMonthMapper[]> {
    const expensesMonth = expenseMonthList.map(eml => this.makeExpenseMonthMapper(eml));
    const expenseMonth = this.repository.create(expensesMonth);
    await this.repository.save(expenseMonth);

    return expenseMonth;
  }

  public async fetchByMonthAndYear(
    month: number,
    year: number,
    userId?: string,
  ): Promise<ExpenseMonthMapper[]> {
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

  public async findById({ id, user_id }: FindByIdInput): Promise<FindByIdOutput> {
    const expense = await this.repository.findOne({
      where: {
        id,
        expense: {
          user_id
        }
       },
       relations: ['expense', 'expense.card'],
    });
    return expense || undefined
  }
}
