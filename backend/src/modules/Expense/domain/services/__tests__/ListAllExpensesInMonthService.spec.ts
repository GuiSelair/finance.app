import 'reflect-metadata';

import ListAllExpensesInMonthService from '../ListAllExpensesInMonthService';
import FakeExpensesInMonthRepository from '../../repositories/fakes/FakeExpensesInMonthRepository';
import FakeCardRepository from '../../Card/repositories/fakes/FakeCardRepository';
import CreateExpenseInMonthService from '../CreateExpenseInMonthService';
import CreateCardService from '../../Card/services/CreateCardService';
import Expense from '../infra/typeorm/entities/Expense';

describe('ListAllExpensesInMonth - Unit Test', () => {
  const expensesInMonthRepository = new FakeExpensesInMonthRepository();
  const cardRepository = new FakeCardRepository();
  const listAllExpensesInMonthService = new ListAllExpensesInMonthService(
    expensesInMonthRepository,
  );
  const createExpenseInMonthService = new CreateExpenseInMonthService(
    expensesInMonthRepository,
    cardRepository,
  );
  const createCardService = new CreateCardService(cardRepository);

  it('should be able to return empty array if not existing expenses in month', async () => {
    const response = await listAllExpensesInMonthService.execute({
      month: 12,
      year: 2022,
      userId: 'fake-user-id',
    });

    expect(response).toBeInstanceOf(Array);
    expect(response).toEqual([]);
  });

  it('should be able to list expenses without card in specific month', async () => {
    const expense = new Expense();
    Object.assign(expense, {
      parcel: 1,
      purchase_date: new Date(2022, 8, 13),
      amount: 500,
      name: 'Little thing',
    });

    await createExpenseInMonthService.execute(expense);
    const response = await listAllExpensesInMonthService.execute({
      month: 10,
      year: 2022,
      userId: 'fake-user-id',
    });

    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  });

  it('should be able to list expenses with card in specific month', async () => {
    const card = await createCardService.execute({
      name: 'Cart Test',
      due_day: 15,
      turning_day: 6,
      flag: 'Mastercard',
      user_id: 'fake_user_id',
    });
    const expense = new Expense();
    Object.assign(expense, {
      parcel: 1,
      purchase_date: new Date(2022, 8, 1),
      card_id: card.id,
      amount: 500,
      name: 'Little thing',
    });

    await createExpenseInMonthService.execute(expense);
    const response = await listAllExpensesInMonthService.execute({
      month: 9,
      year: 2022,
      userId: 'fake-user-id',
    });

    expect(response).toBeInstanceOf(Array);
    expect(response.length).toBeGreaterThan(0);
  });
});
