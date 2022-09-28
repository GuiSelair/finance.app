import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IListAllExpensesInMonth } from '../dtos/IListAllExpensesInMonth';
import ExpenseMonth from '../infra/typeorm/entities/ExpenseInMonth';
import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository';

@injectable()
class ListAllExpensesInMonthService {
  private expensesMonthRepository: IExpensesInMonthRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expensesMonthRepository: IExpensesInMonthRepository,
  ) {
    this.expensesMonthRepository = expensesMonthRepository;
  }

  public async execute({
    month,
    year,
    userId,
  }: IListAllExpensesInMonth): Promise<ExpenseMonth[]> {
    if (month < 0 || month > 12)
      throw new AppError(
        '[ERROR]: Month number invalid, try a number between 1 and 12',
      );

    if (!year) throw new AppError('[ERROR]: Year not be empty');

    const expenses = await this.expensesMonthRepository.findByMonthAndYear(
      month,
      year,
    );

    return expenses;
  }
}

export default ListAllExpensesInMonthService;
