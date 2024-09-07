import { inject, injectable } from 'tsyringe';
import IExpensesRepository from '../repositories/IExpensesRepository';

interface IRemoveExpense {
  expenseId: string;
  userId: string;
}

@injectable()
class RemoveExpenseService {
  private expensesRepository: IExpensesRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
  ) {
    this.expensesRepository = expensesRepository;
  }

  public async execute({
    expenseId,
    userId,
  }: IRemoveExpense): Promise<boolean> {
    const expenseFound = await this.expensesRepository.findByIdAndUserId(
      expenseId,
      userId,
    );

    if (!expenseFound) {
      return false;
    }

    return this.expensesRepository.remove(expenseId);
  }
}

export default RemoveExpenseService;
