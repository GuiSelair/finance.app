import { inject, injectable } from 'tsyringe';
import ICreateExpense from '../dtos/ICreateExpense';

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
    parcel = 1,
    split_expense = false,
    value_of_each = [],
    share_with = [],
    purchase_date = new Date(),
  }: ICreateExpense): Promise<Expense> {
    const transformValuesOfEachArrayToString = Array(value_of_each)?.join('&');
    const transformShareWithArrayToString = Array(share_with)?.join('&');

    if (!card_id) {
      throw new Error('Card not found');
    }

    const newExpense = await this.expensesRepository.create({
      name,
      description,
      amount,
      purchase_date,
      due_date,
      card_id,
      user_id,
      parcel,
      split_expense,
      value_of_each: transformValuesOfEachArrayToString,
      share_with: transformShareWithArrayToString,
    });

    return newExpense;
  }
}

export default CreateExpensesService;
