import { inject, injectable } from 'tsyringe';
import ICreateExpenseRequest from '../dtos/ICreateExpenseRequest';

import Expense from '../infra/typeorm/entities/Expense';
import IExpensesRepository from '../repositories/IExpensesRepository';

@injectable()
class CreateExpensesService {
  private expensesRepository: IExpensesRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
  ) {
    this.expensesRepository = expensesRepository;
  }

  public async execute({
    name,
    description,
    amount,
    due_date,
    card_id,
    user_id,
    parcel,
    split_expense,
    value_of_each,
    share_with,
  }: ICreateExpenseRequest): Promise<Expense> {
    const transformPercentageOfEachArrayToString = value_of_each?.join('&');

    const transformShateWithArrayToString = share_with?.join('&');

    const newExpense = await this.expensesRepository.create({
      name,
      description,
      amount,
      purchase_date: new Date(),
      due_date,
      card_id,
      user_id,
      parcel,
      value_of_each: transformPercentageOfEachArrayToString,
      share_with: transformShateWithArrayToString,
      split_expense,
    });

    return newExpense;
  }
}

export default CreateExpensesService;
