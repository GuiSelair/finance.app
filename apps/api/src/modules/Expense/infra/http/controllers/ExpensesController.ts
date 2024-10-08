import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { requestValidations } from '@helpers/requestValidations';
import { CreateExpenseService } from '@modules/Expense/domain/services/CreateExpenseService';
import { FetchExpensesMonthService } from '@modules/Expense/domain/services/FetchExpensesMonthService';
import { FetchBalanceMonthService } from '@modules/Expense/domain/services/FetchBalanceMonthService';
import { RemoveExpenseService } from '@modules/Expense/domain/services/RemoveExpenseService';

export class ExpensesController {
  public async create(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfEmptyBody(request.body);
    const { id } = request.user;

    const createExpenseService = container.resolve(CreateExpenseService);

    const expense = await createExpenseService.execute({
      ...request.body,
      user_id: id,
    });

    return response.status(201).json(expense);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.query, 'month');
    requestValidations.throwIfPropertyNotExists(request.query, 'year');

    const { id } = request.user;
    const { month, year } = request.query;

    requestValidations.throwIfPropertyMonthIsNotValid(Number(month));
    requestValidations.throwIfPropertyYearIsNotValid(Number(year));

    const listAllExpensesInMonth = container.resolve(FetchExpensesMonthService);
    const expensesInMonth = await listAllExpensesInMonth.execute({
      month: Number(month),
      year: Number(year),
      user_id: id,
    });
    return response.status(200).json(expensesInMonth);
  }

  public async balance(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.query, 'month');
    requestValidations.throwIfPropertyNotExists(request.query, 'year');

    const { id } = request.user;
    const { month, year } = request.query;

    requestValidations.throwIfPropertyMonthIsNotValid(Number(month));
    requestValidations.throwIfPropertyYearIsNotValid(Number(year));

    const fetchBalanceOfMonth = container.resolve(FetchBalanceMonthService);
    const balance = await fetchBalanceOfMonth.execute({
      month: Number(month),
      year: Number(year),
      user_id: id,
    });

    return response.status(200).json(balance);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { id: expense_id } = request.params;

    const removeExpenseService = container.resolve(RemoveExpenseService);
    const result = await removeExpenseService.execute({
      expense_id,
      user_id: id,
    });

    return response.status(200).json(result);
  }
}
