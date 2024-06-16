import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import { IBalance, IGetBalance } from '../dtos/IBalance';
import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository';

@injectable()
class GetBalanceOfMonthService {
  constructor(
    @inject('ExpensesMonthRepository')
    private readonly expensesMonthRepository: IExpensesInMonthRepository,
  ) {}

  async execute({ month, userId, year }: IGetBalance): Promise<IBalance> {
    if (month < 0 || month > 12)
      throw new AppError(
        '[ERROR]: Month number invalid, try a number between 1 and 12',
      );

    if (!year) throw new AppError('[ERROR]: Year not be empty');

    const allExpensesInMonth =
      await this.expensesMonthRepository.findByMonthAndYear(
        month,
        year,
        userId,
      );

    const { totalOfExpenses, totalPayable } = allExpensesInMonth.reduce(
      (accumulator, expense) => {
        return {
          totalOfExpenses:
            accumulator.totalOfExpenses + expense.value_of_parcel,
          totalPayable: accumulator.totalPayable + expense.value_of_parcel,
        };
      },
      {
        totalOfExpenses: 0,
        totalPayable: 0,
      },
    );

    return {
      economy: 0,
      totalOfExpenses: Number(totalOfExpenses.toFixed(2)),
      totalPayable: Number(totalPayable.toFixed(2)),
    };
  }
}

export default GetBalanceOfMonthService;
