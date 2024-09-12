import { inject, injectable } from 'tsyringe';

import { ExpenseMonthMapper } from '../../infra/typeorm/entities/ExpenseInMonth';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';

export interface IListAllExpensesInMonthDTO {
  month: number;
  year: number;
  user_id: string;
}

@injectable()
export class ListAllExpensesInMonthService {
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
  }: IListAllExpensesInMonthDTO): Promise<ExpenseMonthMapper[]> {
    const expenses = await this.expensesMonthRepository.findByMonthAndYear(month, year, user_id);
    return expenses;
  }
}
