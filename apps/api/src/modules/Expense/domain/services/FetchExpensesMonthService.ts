import { inject, injectable } from 'tsyringe';

import { ExpenseMonthMapper } from '../../infra/typeorm/entities/ExpenseMonthMapper';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';

export interface IFetchExpensesMonthServiceDTO {
  month: number;
  year: number;
  user_id: string;
}

@injectable()
export class FetchExpensesMonthService {
  private expensesMonthRepository: IExpensesMonthRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expensesMonthRepository: IExpensesMonthRepository,
  ) {
    this.expensesMonthRepository = expensesMonthRepository;
  }

  public async execute({
    month,
    year,
    user_id,
  }: IFetchExpensesMonthServiceDTO): Promise<ExpenseMonthMapper[] | undefined> {
    const expenses = await this.expensesMonthRepository.fetchByMonthAndYear(month, year, user_id);
    return expenses;
  }
}
