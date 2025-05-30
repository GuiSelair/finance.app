import { inject, injectable, container } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { ExpenseMapper } from '../../infra/typeorm/entities/ExpenseMapper';
import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { Expense } from '../models/Expense';
import { CreateExpenseMonthService } from './CreateExpenseMonthService';
import { ShareExpensePeopleInput } from './CreateExpenseSharedService';

export interface ICreateExpenseInput {
  name: string;
  amount: number;
  card_id: string;
  user_id: string;
  parcel: number;
  manual_expense_date: string;
  purchase_date?: string;
  description?: string;
  due_date?: string;
  is_recurring?: boolean;
  share_expense_people?: ShareExpensePeopleInput[];
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

  public async execute(expenseInput: ICreateExpenseInput): Promise<ExpenseMapper> {
    const expenseToCreate = this.makeExpenseModel(expenseInput);
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
      await createExpenseMonthService.execute({
        expense: newExpense,
        share_expense_people: expenseInput.share_expense_people,
        manual_expense_date: expenseInput.manual_expense_date,
      });
    } catch (err) {
      await this.expensesRepository.remove({ id: newExpense.id });
      throw new AppError(err);
    }

    return newExpense;
  }

  private makeExpenseModel(args: ICreateExpenseInput) {
    return new Expense(
      {
        name: args.name,
        description: args.description,
        amount: args.amount,
        due_date: args.due_date,
        card_id: args.card_id,
        user_id: args.user_id,
        parcel: args.parcel || 1,
        purchase_date: args.purchase_date,
        is_recurring: args.is_recurring || false,
        is_splitted: !!args.share_expense_people?.length,
      },
      'create',
    );
  }
}
