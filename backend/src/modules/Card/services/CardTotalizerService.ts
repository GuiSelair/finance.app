import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpensesInMonthRepository from '../../Expense/repositories/IExpensesInMonthRepository';
import { ICardTotalizer, IGetCardTotalizer } from '../dtos/ICardTotalizer';
import ICardRepository from '../repositories/ICardRepository';

@injectable()
export default class CardTotalizerService {
  private cardRepository: ICardRepository;

  private expenseMonthRepository: IExpensesInMonthRepository;

  constructor(
    @inject('CardRepository')
    cardRepository: ICardRepository,
    @inject('ExpenseMonthRepository')
    expenseMonthRepository: IExpensesInMonthRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
    this.cardRepository = cardRepository;
  }

  public async execute({
    month,
    userId,
    year,
  }: IGetCardTotalizer): Promise<ICardTotalizer[]> {
    if (!month || !year) {
      throw new AppError('Month and year must be valid numbers');
    }

    const getCardsFromUser = await this.cardRepository.findByUserId(userId);

    if (!getCardsFromUser) {
      return [];
    }

    return getCardsFromUser.map(card => ({
      cardId: card.id,
      cardName: card.name,
      total: 10,
    }));
  }
}
