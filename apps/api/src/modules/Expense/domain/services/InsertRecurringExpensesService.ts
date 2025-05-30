import { injectable, inject } from 'tsyringe';
import { addMonths, getMonth, getYear } from 'date-fns';

import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { ExpenseMonth } from '../models/ExpenseMonth';

@injectable()
export class InsertRecurringExpensesService {
  private expensesRepository: IExpensesRepository;
  private expensesInMonthRepository: IExpensesMonthRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
    @inject('ExpensesMonthRepository')
    expensesInMonthRepository: IExpensesMonthRepository,
  ) {
    this.expensesRepository = expensesRepository;
    this.expensesInMonthRepository = expensesInMonthRepository;
  }

  public async execute(): Promise<void> {
    const nextMonth = getMonth(addMonths(new Date(), 1));
    const nextYear = getYear(addMonths(new Date(), 1));

    const recurringExpenses = await this.expensesRepository.fetchRecurringExpenses();
    if (!recurringExpenses?.length) return;

    const expensesInMonth = await this.expensesInMonthRepository.fetchByMonthAndYear(
      nextMonth,
      nextYear,
    );
    const expensesInMonthIds = expensesInMonth?.map(expense => expense.expense_id) ?? [];

    const recurringExpensesToInsertAgain = recurringExpenses.filter(
      expense => !expensesInMonthIds.includes(expense.id),
    );

    if (!recurringExpensesToInsertAgain.length) return;

    const expensesInMonthToInsert = recurringExpensesToInsertAgain.map((expense): ExpenseMonth => {
      return new ExpenseMonth(
        {
          expense_id: expense.id,
          number_current_of_parcel: 1,
          number_total_of_parcel: 1,
          value_of_parcel: expense.amount,
          month: nextMonth,
          year: nextYear,
          is_paid: false,
        },
        'create',
      );
    });

    await this.expensesInMonthRepository.create(expensesInMonthToInsert);
    return;
  }
}
