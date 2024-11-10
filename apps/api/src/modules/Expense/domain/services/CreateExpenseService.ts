import { inject, injectable, container } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { ExpenseMapper } from '../../infra/typeorm/entities/ExpenseMapper';
import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { Expense } from '../models/Expense';
import { CreateExpenseMonthService } from './CreateExpenseMonthService';

export interface ICreateExpenseDTO {
  name: string;
  amount: number;
  card_id: string;
  user_id: string;
  parcel: number;
  purchase_date?: string;
  description?: string;
  due_date?: string;
  is_recurring?: boolean;
}

@injectable()
export class CreateExpenseService {
  private expensesRepository: IExpensesRepository;
  private cardsRepository: ICardsRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
    @inject('CardsRepository')
    cardsRepository: ICardsRepository,
  ) {
    this.expensesRepository = expensesRepository;
    this.cardsRepository = cardsRepository;
  }

  public async execute(expenseDTO: ICreateExpenseDTO): Promise<ExpenseMapper> {
    const expenseToCreate = this.makeExpenseModel(expenseDTO);

    const cardFound = await this.cardsRepository.findById(
      expenseToCreate.card_id!,
      expenseToCreate.user_id!,
    );
    if (!cardFound) {
      throw new AppError('Card not found');
    }

    const newExpense = await this.expensesRepository.create(expenseToCreate);

    try {
      const createExpenseMonthService = container.resolve(CreateExpenseMonthService);
      await createExpenseMonthService.execute(
        new Expense({
          ...newExpense,
        }),
      );
    } catch (err) {
      await this.expensesRepository.remove({ id: newExpense.id });
      throw new AppError(err);
    }

    return newExpense;
  }

  private makeExpenseModel({
    name,
    description,
    amount,
    due_date,
    card_id,
    user_id,
    purchase_date,
    parcel = 1,
    is_recurring = false,
  }: ICreateExpenseDTO) {
    return new Expense(
      {
        name,
        description,
        amount,
        due_date,
        card_id,
        user_id,
        parcel,
        purchase_date,
        is_recurring,
      },
      'create',
    );
  }
}
