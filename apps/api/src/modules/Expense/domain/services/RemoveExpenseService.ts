import { inject, injectable } from 'tsyringe';

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
    if (is_only_one) {
      return await this.expensesMonthRepository.remove({ id: expense_id, user_id });
    }

    return this.expensesRepository.remove({ id: expense_id, user_id });
  }
}
