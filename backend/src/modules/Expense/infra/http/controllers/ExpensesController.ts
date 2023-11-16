import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateExpenseService from '../../../services/CreateExpenseService';
import CreateExpenseInMonthService from '../../../services/CreateExpenseInMonthService';
import ListAllExpensesInMonthService from '../../../services/ListAllExpensesInMonthService';
import GetBalanceOfMonthService from '../../../services/GetBalanceOfMonthService';
import RemoveExpenseService from '../../../services/RemoveExpenseService';

class ExpensesController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    // TODO: Adicionar validação do body
    const {
      name, // Required
      amount, // Required
      parcel, // Required
      card_id, // Required
      isRecurringExpense,
      description,
      split_expense,
      due_date,
      share_with,
      value_of_each,
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
      isRecurringExpense,
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
    const { month, year } = request.query;

    if (!month || !year) {
      return response.status(400).json({ error: 'Parameters not found' })
    }

    const listAllExpensesInMonth = container.resolve(
      ListAllExpensesInMonthService,
    );
    const expensesInMonth = await listAllExpensesInMonth.execute({
      month: Number(month),
      year: Number(year),
      userId: id,
    });
    return response.status(200).json(expensesInMonth);
  }

  public async index(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;
    const { month, year } = request.query;
    const getBalanceOfMonth = container.resolve(GetBalanceOfMonthService);

    const balance = await getBalanceOfMonth.execute({
      month: Number(month),
      year: Number(year),
      userId: id,
    });

    return response.status(200).json(balance);
  }

  public async delete(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { id } = request.user;
    const { id: expenseId } = request.params;

    const removeExpenseService = container.resolve(RemoveExpenseService);
    const result = await removeExpenseService.execute({
      expenseId,
      userId: id,
    });

    return response.status(200).json(result);
  }
}

export default ExpensesController;
