import { inject, injectable } from 'tsyringe';
import { setDay, getMonth, getYear, isBefore } from 'date-fns';

import ICardRepository from '@modules/Card/domain/repositories/ICardsRepository';
import Expense from '../../infra/typeorm/entities/Expense';
import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository';
import AppError from '@shared/errors/AppError';
import ICreateExpenseInMonth, { IGetFirstMonthOfExpense } from '../dtos/ICreateExpenseInMonth';

@injectable()
class CreateExpenseInMonthService {
  private expenseMonthRepository: IExpensesInMonthRepository;
  private cardRepository: ICardRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expenseMonthRepository: IExpensesInMonthRepository,
    @inject('CardRepository')
    cardRepository: ICardRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
    this.cardRepository = cardRepository;
  }

  public async execute(expense: Expense): Promise<void> {
    const expenseMonthList = [] as ICreateExpenseInMonth[];
    const valueOfParcel = Number(expense.amount) / Number(expense.parcel);
    const purchaseDate = new Date(expense.purchase_date);
    const firstMonth = await this.getFirstMonthOfExpense({
      purchaseDate,
      cardId: expense.card_id,
    });

    let currentYear = getYear(purchaseDate);
    let currentMonth = firstMonth;
    for (let parcel = 1; parcel <= expense.parcel; parcel++) {
      if (parcel !== 1) {
        currentMonth += 1;
      }

      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear += 1;
      }
      expenseMonthList.push({
        expense_id: expense.id,
        number_current_of_parcel: parcel,
        number_total_of_parcel: expense.parcel,
        value_of_parcel: valueOfParcel,
        month: currentMonth,
        year: currentYear,
      });
    }

    await this.expenseMonthRepository.create(expenseMonthList);
  }

  private async getFirstMonthOfExpense({
    purchaseDate,
    cardId,
  }: IGetFirstMonthOfExpense): Promise<number> {
    let turningDate: Date;

    if (cardId) {
      const cardFound = await this.cardRepository.findById(cardId);
      if (!cardFound) throw new AppError('[ERROR] Card not exists');

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

export default CreateExpenseInMonthService;
