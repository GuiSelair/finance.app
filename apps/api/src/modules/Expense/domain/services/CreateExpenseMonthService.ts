import { inject, injectable } from 'tsyringe';
import { getYear } from 'date-fns';
import { calculateExpenseMonth } from '@finance-app/helpers'

import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';
import AppError from '@shared/errors/AppError';
import { Expense } from '../models/Expense';
import { ExpenseMonth } from '../models/ExpenseMonth';

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

    let currentYear = Number(expense.expense_date?.split('-')[0]);
    let currentMonth = Number(expense.expense_date?.split('-')[1]) - 1;

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
          },
          'create',
        ),
      );
    }

    await this.expenseMonthRepository.create(expensesMonthList);
  }

  private async getFirstMonthOfExpense({
    purchase_date,
    card_id,
    user_id,
  }: IGetFirstMonthOfExpenseProps): Promise<number> {
    const cardFound = await this.cardsRepository.findById(card_id, user_id);
    if (!cardFound) throw new AppError('Error in generate expenses parcels, card not found.');

    const { month } = calculateExpenseMonth(purchase_date, cardFound.turning_day)
    return month
  }
}
