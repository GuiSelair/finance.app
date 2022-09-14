import 'reflect-metadata';

import ListAllExpensesInMonth from './ListAllExpensesInMonth';
import FakeExpensesInMonthRepository from '../repositories/fakes/FakeExpensesInMonthRepository';
import FakeCardRepository from '../../Card/repositories/fakes/FakeCardRepository';
import CreateExpenseInMonthService from './CreateExpenseInMonthService';
import Expense from '../infra/typeorm/entities/Expense';

describe('ListAllExpensesInMonth - Unit Test', () => {
  const expensesInMonthRepository = new FakeExpensesInMonthRepository();
  const cardRepository = new FakeCardRepository();
  const listAllExpensesInMonth = new ListAllExpensesInMonth(
    expensesInMonthRepository,
  );
  const createExpenseInMonthService = new CreateExpenseInMonthService(
    expensesInMonthRepository,
    cardRepository,
  );

  it('should be able to return empty array if not existing expenses in month', async () => {
    const response = await listAllExpensesInMonth.execute({
      month: 12,
      year: 2022,
    });

    expect(response).toBeInstanceOf(Array);
    expect(response).toEqual([]);
  });

  it('should be able to expenses in specific month', async () => {
    const expense = new Expense();
    Object.assign(expense, {
      parcel: 1,
      purchase_date: new Date(2022, 9, 13),
      amount: 500,
      name: 'Little thing',
    });
    console.log(expense);

    await createExpenseInMonthService.execute(expense);
    const response = await listAllExpensesInMonth.execute({
      month: 10,
      year: 2022,
    });

    console.log(response);
    expect(response).toBeInstanceOf(Array);
  });
});
