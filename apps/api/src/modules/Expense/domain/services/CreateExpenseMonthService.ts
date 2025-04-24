import { container, inject, injectable } from 'tsyringe';
import { getMonth, getYear } from 'date-fns';

import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { Expense } from '../models/Expense';
import { ExpenseMonth } from '../models/ExpenseMonth';
import { CreateExpenseSharedService, type ShareExpensePeopleInput } from './CreateExpenseSharedService';

interface CreateExpenseMonthInput {
  expense: Expense;
  manual_expense_date: string;
  share_expense_people?: ShareExpensePeopleInput[];
}

@injectable()
export class CreateExpenseMonthService {
  constructor(
    @inject('ExpensesMonthRepository')
    private expenseMonthRepository: IExpensesMonthRepository,
  ) {}

  public async execute(input: CreateExpenseMonthInput): Promise<void> {
    const expensesMonthList = [] as ExpenseMonth[];
    const valueOfParcel = Number(input.expense.amount) / Number(input.expense.parcel);

    const manualExpenseDate = this.transformManualExpenseDate(input.manual_expense_date);
    let currentYear = getYear(manualExpenseDate);
    let currentMonth = getMonth(manualExpenseDate);

    for (let parcel = 1; parcel <= input.expense.parcel!; parcel++) {
      if (parcel !== 1) {
        currentMonth += 1;
      }

      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
      }

      expensesMonthList.push(
        new ExpenseMonth(
          {
            expense_id: input.expense.id,
            number_current_of_parcel: parcel,
            number_total_of_parcel: input.expense.parcel,
            value_of_parcel: valueOfParcel,
            month: currentMonth,
            year: currentYear,
            is_paid: false,
          },
          'create',
        ),
      );
    }

    const expensesMonthCreated = await this.expenseMonthRepository.create(expensesMonthList);

    if (input.expense.is_splitted && input.share_expense_people?.length) {
      await this.createExpenseShared(expensesMonthCreated, input.share_expense_people, input.expense.user_id!);
    }
  }

  private async createExpenseShared(expenses_month: ExpenseMonth[], share_expense_people: ShareExpensePeopleInput[], user_id: string): Promise<void> {
    const createExpenseSharedService = container.resolve(CreateExpenseSharedService);

    await createExpenseSharedService.execute({
      expense_months: expenses_month,
      share_expense_people,
      user_id,
    });
  }

  private transformManualExpenseDate(manual_expense_date: string): Date {
    const [year, month] = manual_expense_date.split('-').map(Number);
    return new Date(year, month - 1);
  }
}
