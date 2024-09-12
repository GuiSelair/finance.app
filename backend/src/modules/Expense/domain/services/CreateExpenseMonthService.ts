import { inject, injectable } from 'tsyringe';
import { setDay, getMonth, getYear, isBefore } from 'date-fns';

import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';
import AppError from '@shared/errors/AppError';
import { Expense } from '../models/Expense';
import { ExpenseMonth } from '../models/ExpenseMonth';

interface IGetFirstMonthOfExpenseProps {
  purchaseDate: Date;
  cardId?: string;
  userId: string;
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

    const firstMonth = await this.getFirstMonthOfExpense({
      purchaseDate: expense.purchase_date!,
      cardId: expense.card_id!,
      userId: expense.user_id!,
    });

    let currentYear = getYear(expense.purchase_date!);
    let currentMonth = firstMonth;

    for (let parcel = 1; parcel <= expense.parcel!; parcel++) {
      if (parcel !== 1) {
        currentMonth += 1;
      }

      if (currentMonth > 12) {
        currentMonth = 1;
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
          },
          'create',
        ),
      );
    }

    await this.expenseMonthRepository.create(expensesMonthList);
  }

  // TODO: Revisar lógica
  private async getFirstMonthOfExpense({
    purchaseDate,
    cardId,
    userId,
  }: IGetFirstMonthOfExpenseProps): Promise<number> {
    let turningDate: Date;

    if (cardId) {
      const cardFound = await this.cardsRepository.findById(cardId, userId);
      if (!cardFound) throw new AppError('Error in generate expenses parcels, card not found.');

      turningDate = setDay(new Date(), cardFound.turning_day);
    } else {
      turningDate = purchaseDate;
    }

    if (isBefore(purchaseDate, turningDate)) {
      return getMonth(purchaseDate);
    }

    return getMonth(purchaseDate) + 1;
  }
}
