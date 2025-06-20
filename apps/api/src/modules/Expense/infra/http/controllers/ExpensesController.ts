import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import { requestValidations } from '@helpers/requestValidations';
import { CreateExpenseService } from '@modules/Expense/domain/services/CreateExpenseService';
import { FetchExpensesMonthService } from '@modules/Expense/domain/services/FetchExpensesMonthService';
import { FetchBalanceMonthService } from '@modules/Expense/domain/services/FetchBalanceMonthService';
import { RemoveExpenseService } from '@modules/Expense/domain/services/RemoveExpenseService';
import { FindExpenseMonthService } from '@modules/Expense/domain/services/FindExpenseMonthService';
import { EditExpenseMonthService } from '@modules/Expense/domain/services/EditExpenseMonthService';
import { FetchExpensesSharedTotalizerByPersonService } from '@modules/Expense/domain/services/FetchExpensesSharedTotalizerByPersonService';
import { FetchExpensesSharedByPersonService } from '@modules/Expense/domain/services/FetchExpensesSharedByPersonService';

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

  public async fetch(request: Request, response: Response): Promise<Response> {
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
    const { id: user_id } = request.user;
    const { id: expense_id } = request.params;
    requestValidations.throwIfPropertyNotExists(request.query, 'is_only_one')

    const { is_only_one } = request.query;
    const removeExpenseService = container.resolve(RemoveExpenseService);
    const result = await removeExpenseService.execute({
      expense_id,
      user_id,
      is_only_one: Boolean(Number(is_only_one)),
    });

    return response.status(200).json(result);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.params, 'id')
    requestValidations.throwIfPropertyIsNotUUID(request.params.id)

    const { id: expense_id } = request.params
    const { id: user_id } = request.user

    const findExpenseMonthService = container.resolve(FindExpenseMonthService);
    const expenseMonth = await findExpenseMonthService.execute({ expense_id, user_id });

    return response.status(200).json({ expense: expenseMonth })
  }

  public async edit(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfEmptyBody(request.body)
    requestValidations.throwIfPropertyNotExists(request.params, 'id')
    requestValidations.throwIfPropertyIsNotUUID(request.params.id)

    const { id: expense_id } = request.params
    const { id: user_id } = request.user
    const expenseEditedToSave = request.body

    const editExpenseMonthService = container.resolve(EditExpenseMonthService);
    await editExpenseMonthService.execute({ id: expense_id, user_id, valuesToChange: expenseEditedToSave });

    return response.status(200).send();
  }

  public async fetchSharedTotalizerByPerson(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.query, 'month');
    requestValidations.throwIfPropertyNotExists(request.query, 'year');

    const { id } = request.user;
    const { month, year } = request.query;

    requestValidations.throwIfPropertyMonthIsNotValid(Number(month));
    requestValidations.throwIfPropertyYearIsNotValid(Number(year));

    const fetchExpensesSharedTotalizerByPersonService = container.resolve(FetchExpensesSharedTotalizerByPersonService);
    const expensesSharedTotalizerByPerson = await fetchExpensesSharedTotalizerByPersonService.execute({
      month: Number(month),
      year: Number(year),
      user_id: id,
    });

    return response.status(200).json(expensesSharedTotalizerByPerson);
  }

  public async fetchSharedByPerson(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.query, 'month');
    requestValidations.throwIfPropertyNotExists(request.query, 'year');
    requestValidations.throwIfPropertyNotExists(request.query, 'person_id');

    const { id } = request.user;
    const { month, year, person_id } = request.query;

    requestValidations.throwIfPropertyMonthIsNotValid(Number(month));
    requestValidations.throwIfPropertyYearIsNotValid(Number(year));
    requestValidations.throwIfPropertyIsNotNumber(person_id as string)

    const fetchExpensesSharedByPersonService = container.resolve(FetchExpensesSharedByPersonService);
    const expensesSharedByPerson = await fetchExpensesSharedByPersonService.execute({
      month: Number(month),
      year: Number(year),
      user_id: id,
      person_id: Number(person_id),
    });

    return response.status(200).json(expensesSharedByPerson);
  }
}
