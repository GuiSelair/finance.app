import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';

interface IRemoveExpenseDTO {
  expense_id: string;
  /** Indica se o será removido apenas uma parcela da despesa ou todas as parcelas. */
  is_only_one: boolean;
  user_id: string;
}

@injectable()
export class RemoveExpenseService {
  constructor(
    @inject('ExpensesRepository') private expensesRepository: IExpensesRepository,
    @inject('ExpensesMonthRepository') private expensesMonthRepository: IExpensesMonthRepository
  ) {}

  public async execute({ expense_id, user_id, is_only_one }: IRemoveExpenseDTO): Promise<boolean> {
    if (!!is_only_one) {
      const expenseMonthFound = await this.expensesMonthRepository.findById({ id: expense_id, user_id });
      if (!expenseMonthFound) { throw new AppError('Expense parcel not exist'); }

      const isParcelTheLastOne = await this.checkIfExpenseMonthIsOnlyOne(expenseMonthFound.expense_id)
      if (!isParcelTheLastOne) {
        return await this.expensesMonthRepository.remove({ id: expense_id });
      }

      await this.expensesMonthRepository.remove({ id: expense_id });
      return await this.deleteFatherExpense(expenseMonthFound.expense_id, user_id);
    }

    return await this.deleteFatherExpense(expense_id, user_id);
  }

  private async checkIfExpenseMonthIsOnlyOne(expense_id: string) {
    const [, expenseMonthExistsCount] = await this.expensesMonthRepository.fetchByExpenseId({ expense_id });
    return expenseMonthExistsCount === 1;
  }

  private async deleteFatherExpense(expense_id: string, user_id: string){
    const expenseFound = await this.expensesRepository.findById({ id: expense_id, user_id });
    if (!expenseFound) {
      throw new AppError('Expense not exist');
    }
    return this.expensesRepository.remove({ id: expense_id });
  }
}
