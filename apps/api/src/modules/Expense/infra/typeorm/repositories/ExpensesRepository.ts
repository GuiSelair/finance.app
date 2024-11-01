import { Repository } from 'typeorm';

import { DataSourceConfiguration } from '@infra/typeorm/bootstrap';
import { IExpensesRepository, UpdateExpenseInput } from '@modules/Expense/domain/repositories/IExpensesRepository';
import { ExpenseMapper } from '../entities/ExpenseMapper';
import { Expense } from '@modules/Expense/domain/models/Expense';

export class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<ExpenseMapper>;

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(ExpenseMapper);
  }

  private makeExpenseMapper(input: Expense) {
    return Object.assign(new ExpenseMapper(), input);
  }

  public async create(data: Expense): Promise<ExpenseMapper> {
    const expenseMapper = this.makeExpenseMapper(data);
    const expense = this.repository.create(expenseMapper);
    await this.repository.save(expense);

    return expense;
  }

  public async fetch(userId: string): Promise<ExpenseMapper[] | null> {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }

  public async findById(id: string, userId: string): Promise<ExpenseMapper | null> {
    return this.repository.findOne({
      where: {
        id,
        user_id: userId,
      },
    });
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.repository.delete({
      id,
    });

    return !!result?.affected;
  }

  public async fetchRecurringExpenses(userId?: string): Promise<ExpenseMapper[] | undefined> {
    return this.repository.find({
      where: {
        is_recurring: true,
        ...(!!userId && { user_id: userId }),
      },
    });
  }

  public async update({ id, data }: UpdateExpenseInput): Promise<void> {
    await this.repository.save({ ...data, id});
  }
}
