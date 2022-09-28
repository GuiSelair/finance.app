import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateExpenseService from '../../../services/CreateExpenseService';
import CreateExpenseInMonthService from '../../../services/CreateExpenseInMonthService';
import ListAllExpensesInMonth from '../../../services/ListAllExpensesInMonthService';

class ExpensesController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const {
      name,
      description,
      amount,
      split_expense,
      parcel,
      due_date,
      share_with,
      value_of_each,
      card_id,
    } = request.body;
    const { id } = request.user;
    const createExpenseService = container.resolve(CreateExpenseService);
    const createExpensesInMonthService = container.resolve(
      CreateExpenseInMonthService,
    );

    const expense = await createExpenseService.execute({
      name,
      description,
      amount,
      parcel,
      user_id: id,
      due_date,
      value_of_each,
      share_with,
      split_expense,
      card_id,
    });

    await createExpensesInMonthService.execute(expense);

    return response.status(201).json(expense);
  }

  public async show(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;
    const { month, year } = request.body;
    const listAllExpensesInMonth = container.resolve(ListAllExpensesInMonth);
    const expensesInMonth = await listAllExpensesInMonth.execute({
      month,
      year,
      userId: id,
    });
    return response.status(200).json(expensesInMonth);
  }
}

export default ExpensesController;
