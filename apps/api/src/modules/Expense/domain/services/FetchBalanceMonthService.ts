import { injectable, inject } from 'tsyringe';

import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';
import { IIncomesRepository } from '@modules/Settings/domain/repositories/IIncomeRepository';

interface IBalanceOutput {
  totalOfExpenses: number;
  totalPayable: number;
  economy: number;
}

interface IFetchBalanceInput {
  month: number;
  year: number;
  user_id: string;
}

@injectable()
export class FetchBalanceMonthService {
  constructor(
    @inject('ExpensesMonthRepository')
    private readonly expensesMonthRepository: IExpensesMonthRepository,
    @inject('IncomesRepository')
    private readonly incomesRepository: IIncomesRepository
  ) {}

  async execute({ month, user_id, year }: IFetchBalanceInput): Promise<IBalanceOutput> {
    const allExpensesInMonth =
      (await this.expensesMonthRepository.fetchByMonthAndYear(month, year, user_id)) || [];

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

    const incomeFound = await this.incomesRepository.findByMonthAndYear({ month, year, user_id })
    const economyCalculated = Number(incomeFound?.value) - totalPayable

    return {
      economy: Number(economyCalculated.toFixed(2)),
      totalOfExpenses: Number(totalOfExpenses.toFixed(2)),
      totalPayable: Number(totalPayable.toFixed(2)),
    };
  }
}
