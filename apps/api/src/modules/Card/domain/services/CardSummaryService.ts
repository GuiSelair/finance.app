import { injectable, inject } from 'tsyringe';

import { IExpensesMonthRepository } from '@modules/Expense/domain/repositories/IExpensesMonthRepository';
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper';
import { Card } from '../models/Card';
import { ICardsRepository } from '../repositories/ICardsRepository';
import { CardMapper } from '@modules/Card/infra/typeorm/entities/CardMapper';
import { ExpenseMonth } from '@modules/Expense/domain/models/ExpenseMonth';

export interface ICardSummaryDTO {
  month: number;
  year: number;
  user_id: string;
}

@injectable()
export class CardSummaryService {
  private expenseMonthRepository: IExpensesMonthRepository;
  private cardsRepository: ICardsRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expenseMonthRepository: IExpensesMonthRepository,
    @inject('CardsRepository')
    cardsRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
    this.cardsRepository = cardsRepository;
  }

  public async execute({ month, user_id, year }: ICardSummaryDTO): Promise<Card[]> {
    const cardsMapper = await this.cardsRepository.fetch(user_id);
    if (!cardsMapper || !cardsMapper?.length) {
      return [];
    }
    const cards = this.makeCardsModel(cardsMapper);

    const expensesInSpecificMonth =
      (await this.expenseMonthRepository.fetchByMonthAndYear(month, year, user_id)) || [];

    const expensesMonth = this.makeExpensesMonthModel(expensesInSpecificMonth);
    const expensesInMonthGroupByCard = this.getExpensesTotalGroupByCard(expensesMonth, cards);

    return expensesInMonthGroupByCard;
  }

  /**
   * Calculates the total expenses grouped by card.
   *
   * @param expensesInMonth - The expenses in the month.
   * @param cards - The list of cards.
   * @returns An array of objects containing the card ID, name, turning day, and total expenses.
   */
  private getExpensesTotalGroupByCard(expensesInMonth: ExpenseMonth[], cards: Card[]): Card[] {
    return cards.reduce<Card[]>((accumulator, card) => {
      const expensesInCard = expensesInMonth.filter(
        expenseInMonth => expenseInMonth?.expense?.card_id === card.id,
      );
      const cardSubtotal = expensesInCard.reduce((accumulator, expenseInCard) => {
        return accumulator + (expenseInCard.value_of_parcel || 0);
      }, 0);

      card.setTotal(cardSubtotal);
      accumulator.push(card);

      return accumulator;
    }, []);
  }

  private makeCardsModel(cardsMapper: CardMapper[]) {
    return cardsMapper.map(cardMapper => new Card(cardMapper, 'partial'));
  }

  private makeExpensesMonthModel(expensesMonth: ExpenseMonthMapper[]) {
    return expensesMonth.map(expenseMonth => new ExpenseMonth(expenseMonth));
  }
}
