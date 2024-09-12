import { inject, injectable } from 'tsyringe';

import { IExpensesRepository } from '../repositories/IExpensesRepository';

interface IRemoveExpenseDTO {
  expense_id: string;
  user_id: string;
}

@injectable()
export class RemoveExpenseService {
  private expensesRepository: IExpensesRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
  ) {
    this.expensesRepository = expensesRepository;
  }

  public async execute({ expense_id, user_id }: IRemoveExpenseDTO): Promise<boolean> {
    const expenseFound = await this.expensesRepository.findById(expense_id, user_id);

    if (!expenseFound) {
      return false;
    }

    return this.expensesRepository.remove(expense_id);
  }
}
