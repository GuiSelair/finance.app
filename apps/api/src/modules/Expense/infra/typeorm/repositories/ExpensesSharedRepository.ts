import { In, Repository } from 'typeorm';

import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { ExpenseSharedMapper } from '../entities/ExpenseSharedMapper';
import { IExpensesSharedRepository } from '@modules/Expense/domain/repositories/IExpensesSharedRepository';
import { ExpenseShared } from '@modules/Expense/domain/models/ExpenseShared';

export class ExpensesSharedRepository implements IExpensesSharedRepository {
  private repository: Repository<ExpenseSharedMapper>;

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(ExpenseSharedMapper);
  }

  private makeExpenseSharedMapper(input: ExpenseShared) {
    return Object.assign(new ExpenseSharedMapper(), input);
  }

  public async create(input: ExpenseShared[]) {
    const expenseSharedMapper = input.map(this.makeExpenseSharedMapper);
    const expenseSharedToCreate = this.repository.create(expenseSharedMapper);
    await this.repository.save(expenseSharedToCreate);
  }

  public async fetchByExpenseMonthIds(expense_month_ids: string[]): Promise<ExpenseShared[]> {
    const expenseSharedFound = await this.repository.find({
      where: {
        expense_month_id: In(expense_month_ids),
      },
      relations: {
        share_expense_person: true,
      }
    });

    return expenseSharedFound;
  }
}
