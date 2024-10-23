import { injectable, inject } from 'tsyringe'

import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';
import { ExpenseMonth } from '../models/ExpenseMonth';
import { Expense } from '../models/Expense';
import AppError from '@shared/errors/AppError';

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
  ){}

  async execute(params: EditExpenseMonthDTO): Promise<ExpenseMonth | null> {
    const { id, user_id, valuesToChange } = params;
    const expenseMonthModel = this.makeExpenseMonthModel(params);

    const expenseMonthFound = await this.expensesMonthRepository.findById({ id, user_id });
    if (!expenseMonthFound) {
      throw new AppError('This expense month does not exist');
    }

    if (valuesToChange.card_id) {
      // TODO: Validar se cartão existe
    }

    // TODO: Editar despesa e despesa mês
    return null;
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
