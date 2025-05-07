import { injectable, inject } from 'tsyringe';

import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { IIncomesRepository } from '@modules/Settings/domain/repositories/IIncomeRepository';
import { IExpensesSharedRepository } from '../repositories/IExpensesSharedRepository';

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
    private readonly incomesRepository: IIncomesRepository,
    @inject('ExpensesSharedRepository')
    private readonly expensesSharedRepository: IExpensesSharedRepository,
  ) {}

  async execute({ month, user_id, year }: IFetchBalanceInput): Promise<IBalanceOutput> {
    const [allExpensesInMonth = [], incomeFound] = await Promise.all([
      this.expensesMonthRepository.fetchByMonthAndYear(month, year, user_id),
      this.incomesRepository.findByMonthAndYear({ month, year, user_id })
    ])

    const expenseSharedIds = allExpensesInMonth.map((expense) => expense.id)
    const expenseSharedFound = await this.expensesSharedRepository.fetchByExpenseMonthIds(expenseSharedIds)

    const totalOfExpenses = allExpensesInMonth.reduce(
      (accumulator, expense) => {
        return accumulator + expense.value_of_parcel
      },
      0
    );

    const totalPayable = expenseSharedFound.reduce(
      (accumulator, expense) => {
        return accumulator - expense.amount!
      },
      totalOfExpenses
    )


    const economyCalculated = Number(incomeFound?.value) - totalPayable

    return {
      economy: Number(economyCalculated.toFixed(2)),
      totalOfExpenses: Number(totalOfExpenses.toFixed(2)),
      totalPayable: Number(totalPayable.toFixed(2)),
    };
  }
}
