import { inject, injectable } from 'tsyringe';
import ICreateExpense from '../dtos/ICreateExpense';

import Expense from '../infra/typeorm/entities/Expense';
import IExpensesRepository from '../repositories/IExpensesRepository';
import ICardRepository from '../../Card/repositories/ICardRepository';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../../User/repositories/IUsersRepository';

@injectable()
class CreateExpensesService {
  private expensesRepository: IExpensesRepository;
  private cardsRepository: ICardRepository;
  private usersRepository: IUsersRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
    @inject('CardRepository')
    cardsRepository: ICardRepository,
    @inject('UsersRepository')
    usersRepository: IUsersRepository,
  ) {
    this.expensesRepository = expensesRepository;
    this.cardsRepository = cardsRepository;
    this.usersRepository = usersRepository;
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
    isRecurringExpense = false,
  }: ICreateExpense): Promise<Expense> {
    const transformValuesOfEachArrayToString = Array(value_of_each)?.join('&');
    const transformShareWithArrayToString = Array(share_with)?.join('&');

    const userFound = await this.usersRepository.findById(user_id ?? '');
    if (!userFound) {
      throw new AppError('User not found');
    }

    const cardFound = await this.cardsRepository.findById(card_id ?? '');
    if (!cardFound) {
      throw new AppError('Card not found');
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
