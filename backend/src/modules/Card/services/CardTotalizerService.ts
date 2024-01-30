import { injectable, inject, container } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import IExpensesInMonthRepository from '../../Expense/repositories/IExpensesInMonthRepository';
import FetchCardsService from './FetchCardsService';
import Card from '../infra/typeorm/entities/Card';
import ExpenseInMonth from '../../Expense/infra/typeorm/entities/ExpenseInMonth';

export interface ICardTotalizerReturn {
  id: string;
  name: string;
  turningDay: number;
  total: number;
}

export interface ICardTotalizerParams {
  month: number;
  year: number;
  userId: string;
}

@injectable()
export default class CardTotalizerService {
  private expenseMonthRepository: IExpensesInMonthRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expenseMonthRepository: IExpensesInMonthRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
  }

  public async execute({
    month,
    userId,
    year,
  }: ICardTotalizerParams): Promise<ICardTotalizerReturn[]> {
    if (isNaN(month) || isNaN(year)) {
      throw new AppError('Month and year must be valid numbers');
    }

    const fetchCardsService = container.resolve(FetchCardsService);
    const { cards: allCards } = await fetchCardsService.execute({ userId });

    if (!allCards.length) { return []; }

    const expensesInSpecificMonth = await this.expenseMonthRepository.findByMonthAndYear(month, year, userId);
    const expensesInMonthGroupByCard = this.getExpensesTotalGroupByCard(expensesInSpecificMonth, allCards);

    return expensesInMonthGroupByCard;
  }

  /**
   * Calculates the total expenses grouped by card.
   *
   * @param expensesInMonth - The expenses in the month.
   * @param cards - The list of cards.
   * @returns An array of objects containing the card ID, name, turning day, and total expenses.
   */
  private getExpensesTotalGroupByCard(expensesInMonth: ExpenseInMonth[], cards: Card[]): ICardTotalizerReturn[] {
    return cards.reduce<ICardTotalizerReturn[]>((accumulator, card) => {
      const expensesInCard = expensesInMonth.filter(
        expenseInMonth => expenseInMonth.expense.card_id === card.id,
      );
      const total = expensesInCard.reduce((accumulator, expenseInCard) => {
        return accumulator + expenseInCard.value_of_parcel;
      }, 0)

      accumulator.push({
        id: card.id,
        name: card.name,
        turningDay: card.turning_day,
        total: Number(total.toFixed(2)),
      });

      return accumulator;
    }, []);
  }
}
