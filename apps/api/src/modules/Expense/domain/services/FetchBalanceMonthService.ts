import { injectable, inject } from 'tsyringe';

import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';

interface IBalanceOutput {
  totalOfExpenses: number;
  totalPayable: number;
  economy: number;
}

interface IFetchBalanceDTO {
  month: number;
  year: number;
  user_id: string;
}

@injectable()
export class FetchBalanceMonthService {
  constructor(
    @inject('ExpensesMonthRepository')
    private readonly expensesMonthRepository: IExpensesMonthRepository,
  ) {}

  async execute({ month, user_id, year }: IFetchBalanceDTO): Promise<IBalanceOutput> {
    const allExpensesInMonth =
      (await this.expensesMonthRepository.findByMonthAndYear(month, year, user_id)) || [];

    const { totalOfExpenses, totalPayable } = allExpensesInMonth.reduce(
      (accumulator, expense) => {
        return {
          totalOfExpenses: accumulator.totalOfExpenses + expense.value_of_parcel,
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
