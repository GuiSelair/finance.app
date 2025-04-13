import { container, inject, injectable } from 'tsyringe';
import { getMonth, getYear } from 'date-fns';

import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { Expense } from '../models/Expense';
import { ExpenseMonth } from '../models/ExpenseMonth';
import { CreateExpenseSharedService } from './CreateExpenseSharedService';

interface IGetFirstMonthOfExpenseProps {
  purchase_date: Date;
  card_id: string;
  user_id: string;
}

@injectable()
export class CreateExpenseMonthService {
  private expenseMonthRepository: IExpensesMonthRepository;
  private cardsRepository: ICardsRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expenseMonthRepository: IExpensesMonthRepository,
    @inject('CardsRepository')
    cardsRepository: ICardsRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
    this.cardsRepository = cardsRepository;
  }

  public async execute(expense: Expense): Promise<void> {
    const expensesMonthList = [] as ExpenseMonth[];
    const valueOfParcel = Number(expense.amount) / Number(expense.parcel);

    let currentYear = getYear(expense.manual_expense_date!);
    let currentMonth = getMonth(expense.manual_expense_date!);

    for (let parcel = 1; parcel <= expense.parcel!; parcel++) {
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
            expense_id: expense.id,
            number_current_of_parcel: parcel,
            number_total_of_parcel: expense.parcel,
            value_of_parcel: valueOfParcel,
            month: currentMonth,
            year: currentYear,
            is_paid: false,
            share_expense_people: expense.share_expense_people,
          },
          'create',
        ),
      );
    }

    const expensesMonthCreated = await this.expenseMonthRepository.create(expensesMonthList);
    if (expense.is_splitted && expense.share_expense_people) {
      await this.createExpenseShared(expensesMonthCreated, expense.share_expense_people, expense.user_id!);
    }
  }

  private async createExpenseShared(expenses_month: ExpenseMonth[], share_expense_people: Expense['share_expense_people'], user_id: string): Promise<void> {
    const createExpenseSharedService = container.resolve(CreateExpenseSharedService);

    await createExpenseSharedService.execute({
      expense_months: expenses_month,
      share_expense_people,
      user_id,
    });
  }
}
