import { In, Repository } from 'typeorm';

import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { ExpenseSharedMapper } from '../entities/ExpenseSharedMapper';
import type { FetchByPersonIdInput, IExpensesSharedRepository } from '@modules/Expense/domain/repositories/IExpensesSharedRepository';
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
      relations: [
        'share_expense_person',
      ]
    });

    return expenseSharedFound;
  }

  public async fetchByPersonId(input: FetchByPersonIdInput): Promise<ExpenseShared[]> {
    const expenseSharedFound = await this.repository.find({
      select: {
        id: true,
        amount: true,
        share_expense_person_id: true,
        expense_month: {
          id: true,
          number_current_of_parcel: true,
          number_total_of_parcel: true,
          expense: {
            name: true,
          }
        },
      },
      where: {
        share_expense_person_id: input.person_id,
        expense_month: {
          expense: {
            user_id: input.user_id,
          },
          month: input.month,
          year: input.year,
        },
      },
      relations: [
        'expense_month',
        'expense_month.expense',
      ],
    })

    return expenseSharedFound;
  }
}
