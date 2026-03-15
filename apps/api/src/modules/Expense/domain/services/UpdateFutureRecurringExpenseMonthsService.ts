import { injectable, inject } from 'tsyringe';
import type { EntityManager } from 'typeorm';

import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper';

export interface UpdateFutureRecurringExpenseMonthsInput {
  expense_id: string;
  reference_year: number;
  reference_month: number;
  new_amount: number;
  manager?: EntityManager;
}

@injectable()
export class UpdateFutureRecurringExpenseMonthsService {
  constructor(
    @inject('ExpensesMonthRepository')
    private expensesMonthRepository: IExpensesMonthRepository,
  ) {}

  public async execute(input: UpdateFutureRecurringExpenseMonthsInput): Promise<void> {
    const { expense_id, reference_year, reference_month, new_amount, manager } = input;

    let futureExpensesMonth: ExpenseMonthMapper[];

    if (manager) {
      const records = await manager.getRepository(ExpenseMonthMapper).find({
        where: { expense_id },
      });
      futureExpensesMonth = records.filter(
        (expenseMonth) =>
          expenseMonth.year > reference_year ||
          (expenseMonth.year === reference_year && expenseMonth.month > reference_month),
      );
    } else {
      const [expensesMonth] = await this.expensesMonthRepository.fetchByExpenseId({
        expense_id,
      });
      futureExpensesMonth =
        expensesMonth?.filter(
          (expenseMonth) =>
            expenseMonth.year > reference_year ||
            (expenseMonth.year === reference_year && expenseMonth.month > reference_month),
        ) ?? [];
    }

    if (!futureExpensesMonth.length) return;

    if (manager) {
      const repo = manager.getRepository(ExpenseMonthMapper);
      for (const expenseMonth of futureExpensesMonth) {
        await repo.save({ ...expenseMonth, value_of_parcel: new_amount });
      }
    } else {
      for (const expenseMonth of futureExpensesMonth) {
        await this.expensesMonthRepository.update({
          id: expenseMonth.id,
          data: { value_of_parcel: new_amount },
        });
      }
    }
  }
}
