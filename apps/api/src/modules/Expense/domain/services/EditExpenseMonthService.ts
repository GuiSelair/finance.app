import { injectable, inject } from 'tsyringe'

import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { ExpenseMonth } from '../models/ExpenseMonth';
import { Expense } from '../models/Expense';
import AppError from '@shared/errors/AppError';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';

interface EditExpenseMonthDTO {
  id: string;
  user_id: string;
  valuesToChange: {
    name?: string;
    description?: string;
    value_of_parcel?: number;
    is_paid?: boolean;
    card_id?: string;
  }
}


@injectable()
export class EditExpenseMonthService {
  constructor(
    @inject('ExpensesRepository') private expensesRepository: IExpensesRepository,
    @inject('ExpensesMonthRepository') private expensesMonthRepository: IExpensesMonthRepository,
    @inject('CardsRepository') private cardsRepository: ICardsRepository,
  ){}

  async execute(params: EditExpenseMonthDTO): Promise<void> {
    const { id, user_id, valuesToChange } = params;

    const expenseMonthFound = await this.expensesMonthRepository.findById({ id, user_id });
    if (!expenseMonthFound) {
      throw new AppError('This expense month does not exist');
    }

    const expenseMonthModel = this.makeExpenseMonthModel(params);

    if (valuesToChange.card_id) {
      const cardFound = await this.cardsRepository.findById(valuesToChange.card_id, user_id);
      if (!cardFound) {
        throw new AppError('This card does not exist');
      }
    }

    if ('name' in valuesToChange || 'description' in valuesToChange || 'card_id' in valuesToChange ) {
      await this.expensesRepository.update({ id: expenseMonthFound.expense_id, data: expenseMonthModel.expense! });
    }

    if ('value_of_parcel' in valuesToChange || 'is_paid' in valuesToChange) {
      await this.expensesMonthRepository.update({ id, data: expenseMonthModel });
    }

    return;
  }

  private makeExpenseMonthModel(data: EditExpenseMonthDTO) {
    return new ExpenseMonth({
      id: data.id,
      is_paid: data.valuesToChange.is_paid,
      value_of_parcel: data.valuesToChange.value_of_parcel,
      expense: new Expense({
        name: data.valuesToChange.name,
        description: data.valuesToChange.description,
        card_id: data.valuesToChange.card_id,
      }, 'partial')
    }, 'partial')
  }
}
