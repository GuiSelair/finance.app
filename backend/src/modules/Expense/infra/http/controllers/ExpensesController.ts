import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateExpenseService from '../../../services/CreateExpenseService';

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
      percentage_of_each,
      card_id,
    } = request.body;
    const { id } = request.user;
    const createExpenseService = container.resolve(CreateExpenseService);

    const expense = await createExpenseService.execute({
      name,
      description,
      amount,
      parcel,
      user_id: id,
      due_date,
      percentage_of_each,
      share_with,
      split_expense,
      card_id,
    });

    return response.status(201).json(expense);
  }
}

export default ExpensesController;
