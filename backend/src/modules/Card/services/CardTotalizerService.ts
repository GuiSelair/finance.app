import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpensesInMonthRepository from '../../Expense/repositories/IExpensesInMonthRepository';
import IExpensesRepository from '../../Expense/repositories/IExpensesRepository';
import { ICardTotalizer, IGetCardTotalizer } from '../dtos/ICardTotalizer';
import ICardRepository from '../repositories/ICardRepository';

@injectable()
export default class CardTotalizerService {
  private cardRepository: ICardRepository;

  private expenseMonthRepository: IExpensesInMonthRepository;

  private expensesRepository: IExpensesRepository;

  constructor(
    @inject('CardRepository')
    cardRepository: ICardRepository,
    @inject('ExpenseMonthRepository')
    expenseMonthRepository: IExpensesInMonthRepository,
    @inject('ExpenseRepository')
    expensesRepository: IExpensesRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
    this.cardRepository = cardRepository;
    this.expensesRepository = expensesRepository;
  }

  public async execute({
    month,
    userId,
    year,
  }: IGetCardTotalizer): Promise<ICardTotalizer[]> {
    if (!month || !year) {
      throw new AppError('Month and year must be valid numbers');
    }

    const allExpensesOfUser = await this.expensesRepository.findByUserId(
      userId,
    );

    if (!allExpensesOfUser) {
      return [];
    }

    console.log(allExpensesOfUser);

    const expensesInSearchMonth =
      await this.expenseMonthRepository.findByMonthAndYear(month, year, userId);

    console.log(expensesInSearchMonth);

    return [
      {
        cardId: 'fake',
        cardName: 'FAKA',
        total: 10,
      },
    ];
  }
}
