import { injectable, inject } from 'tsyringe'

import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';
import { ExpenseMonth } from '../models/ExpenseMonth';

interface IFindExpenseMonthDTO {
  expense_id: string;
  user_id: string;
}

@injectable()
export class FindExpenseMonthService {
  constructor(
    @inject('ExpensesMonthRepository') private expensesMonthRepository: IExpensesMonthRepository,
  ){}

  async execute({ expense_id, user_id }: IFindExpenseMonthDTO): Promise<ExpenseMonth | undefined> {
    const expenseFound = await this.expensesMonthRepository.findById({ id: expense_id, user_id });
    return expenseFound || undefined;
  }
}
