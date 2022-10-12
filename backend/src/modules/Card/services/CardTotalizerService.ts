import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IExpensesInMonthRepository from '../../Expense/repositories/IExpensesInMonthRepository';
import IExpensesRepository from '../../Expense/repositories/IExpensesRepository';
import { ICardTotalizer, IGetCardTotalizer } from '../dtos/ICardTotalizer';
import ICardRepository from '../repositories/ICardRepository';

type IExpensesGroupByCard = {
  [propName: string]: string[];
};
@injectable()
export default class CardTotalizerService {
  private cardRepository: ICardRepository;

  private expenseMonthRepository: IExpensesInMonthRepository;

  private expensesRepository: IExpensesRepository;

  constructor(
    @inject('CardRepository')
    cardRepository: ICardRepository,
    @inject('ExpensesMonthRepository')
    expenseMonthRepository: IExpensesInMonthRepository,
    @inject('ExpensesRepository')
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

    const expensesInSearchMonth =
      await this.expenseMonthRepository.findByMonthAndYear(month, year, userId);

    const expensesGroupByCard = allExpensesOfUser.reduce(
      (accumulator, expense) => {
        if (!expense?.card_id) return accumulator;

        if (!Object.keys(accumulator).includes(expense.card_id)) {
          accumulator[expense.card_id] = [expense.id];
        } else {
          accumulator[expense.card_id].push(expense.id);
        }

        return accumulator;
      },
      {} as IExpensesGroupByCard,
    );

    const allCardsDetails = await Promise.all(
      Object.keys(expensesGroupByCard).map(cardId =>
        this.cardRepository.findById(cardId),
      ),
    );

    return Object.entries(expensesGroupByCard).map(
      ([cardId, expensesId]): ICardTotalizer => {
        const sumOfCardExpenses = expensesId.reduce(
          (accumulator, expenseId) => {
            const expenseFoundDetails = expensesInSearchMonth.find(
              expenseInMonth => expenseInMonth.expense_id === expenseId,
            );

            if (!expenseFoundDetails) return accumulator;
            return accumulator + expenseFoundDetails?.value_of_parcel;
          },
          0,
        );

        return {
          cardId,
          cardName:
            allCardsDetails.find(card => card?.id === cardId)?.name || '',
          total: Number(sumOfCardExpenses.toFixed(2)),
        };
      },
    );
  }
}
