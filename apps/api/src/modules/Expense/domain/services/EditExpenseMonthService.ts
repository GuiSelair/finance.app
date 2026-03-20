import { injectable, inject } from 'tsyringe';

import { IExpensesRepository } from '../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesMonthRepository';
import { ExpenseMonth } from '../models/ExpenseMonth';
import { Expense } from '../models/Expense';
import AppError from '@shared/errors/AppError';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { UpdateFutureRecurringExpenseMonthsService } from './UpdateFutureRecurringExpenseMonthsService';
import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { ExpenseMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMapper';
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper';

interface EditExpenseMonthDTO {
  id: string;
  user_id: string;
  valuesToChange: {
    name?: string;
    description?: string;
    amount?: number;
    value_of_parcel?: number;
    is_paid?: boolean;
    card_id?: string;
  };
}

@injectable()
export class EditExpenseMonthService {
  constructor(
    @inject('ExpensesRepository') private expensesRepository: IExpensesRepository,
    @inject('ExpensesMonthRepository') private expensesMonthRepository: IExpensesMonthRepository,
    @inject('CardsRepository') private cardsRepository: ICardsRepository,
    private updateFutureRecurringExpenseMonthsService: UpdateFutureRecurringExpenseMonthsService,
  ) {}

  async execute(params: EditExpenseMonthDTO): Promise<void> {
    const { id, user_id, valuesToChange } = params;

    const expenseMonthFound = await this.expensesMonthRepository.findById({ id, user_id });
    if (!expenseMonthFound) {
      throw new AppError('This expense month does not exist');
    }

    const expense = expenseMonthFound.expense;
    if (valuesToChange.amount !== undefined && expense.parcel > 1) {
      throw new AppError('Total amount editing is not allowed for installment expenses.');
    }

    if (valuesToChange.card_id) {
      const cardFound = await this.cardsRepository.findById(valuesToChange.card_id, user_id);
      if (!cardFound) {
        throw new AppError('This card does not exist');
      }
    }

    const model = this.makeExpenseMonthModel(params);
    const isRecurringExpenseAmountEdit =
      valuesToChange.amount !== undefined &&
      expense.is_recurring === true &&
      expense.parcel === 1;

    await DataSourceConfiguration.manager.transaction(async (manager) => {
      const expenseRepository = manager.getRepository(ExpenseMapper);
      const expenseMonthRepository = manager.getRepository(ExpenseMonthMapper);

      const expenseToSave = {
        ...expense,
        name: model.expense?.name ?? expense.name,
        description: model.expense?.description ?? expense.description,
        card_id: model.expense?.card_id ?? expense.card_id,
        amount: model.expense?.amount ?? model.value_of_parcel ?? expense.amount,
      };
      await expenseRepository.save(expenseToSave);

      const currentMonthToSave = {
        ...expenseMonthFound,
        value_of_parcel:
          valuesToChange.amount ?? model.value_of_parcel ?? expenseMonthFound.value_of_parcel,
        is_paid: model.is_paid ?? expenseMonthFound.is_paid,
      };
      await expenseMonthRepository.save(currentMonthToSave);

      if (isRecurringExpenseAmountEdit) {
        await this.updateFutureRecurringExpenseMonthsService.execute({
          expense_id: expenseMonthFound.expense_id,
          reference_year: expenseMonthFound.year,
          reference_month: expenseMonthFound.month,
          new_amount: valuesToChange.amount ?? 0,
          manager,
        });
      }
    });
  }

  private makeExpenseMonthModel(data: EditExpenseMonthDTO): ExpenseMonth {
    return new ExpenseMonth(
      {
        id: data.id,
        is_paid: data.valuesToChange.is_paid,
        value_of_parcel: data.valuesToChange.value_of_parcel,
        expense: new Expense(
          {
            name: data.valuesToChange.name,
            description: data.valuesToChange.description,
            card_id: data.valuesToChange.card_id,
            amount: data.valuesToChange.amount,
          },
          'partial',
        ),
      },
      'partial',
    );
  }
}
