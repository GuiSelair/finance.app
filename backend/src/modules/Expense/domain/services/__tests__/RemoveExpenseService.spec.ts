import 'reflect-metadata';

import RemoveExpenseService from '../RemoveExpenseService';
import FakeExpensesRepository from '../../repositories/fakes/FakeExpensesRepository';
import FakeExpensesInMonthRepository from '../../repositories/fakes/FakeExpensesInMonthRepository';

describe('RemoveExpenseService - Unit Test', () => {
  const fakeExpensesRepository = new FakeExpensesRepository();
  const fakeExpensesInMonthRepository = new FakeExpensesInMonthRepository();
  const removeExpenseService = new RemoveExpenseService(fakeExpensesRepository);

  let expenseId = '';

  beforeEach(async () => {
    const expense = await fakeExpensesRepository.create({
      name: 'Fake expense',
      description: 'Fake description',
      amount: 100,
      user_id: 'fake-user-id',
    });

    expenseId = expense.id;

    const fakeExpensesInMonthToCreate = [
      {
        expense_id: expense.id,
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: 200,
        month: 12,
        year: 2022,
      },
      {
        expense_id: expense.id,
        number_current_of_parcel: 1,
        number_total_of_parcel: 3,
        value_of_parcel: 37.62,
        month: 1,
        year: 2023,
      },
      {
        expense_id: 'fake-expense-id3',
        number_current_of_parcel: 1,
        number_total_of_parcel: 3,
        value_of_parcel: 37.62,
        month: 11,
        year: 2022,
      },
    ];

    await fakeExpensesInMonthRepository.create(fakeExpensesInMonthToCreate);
  });

  it('should be able to remove expense', async () => {
    const result = await removeExpenseService.execute({
      expenseId,
      userId: 'fake-user-id',
    });

    expect(result).toBeTruthy();

    const expenseFound = fakeExpensesRepository.repository.find(
      expenses => expenses.id === expenseId,
    );

    expect(expenseFound).toBeFalsy();
  });

  it.skip('should be able to remove expenses in month when main expense has removed', async () => {
    const result = await removeExpenseService.execute({
      expenseId,
      userId: 'fake-user-id',
    });

    expect(result).toBeTruthy();

    const expenseFound = fakeExpensesInMonthRepository.repository.find(
      expensesInMonth => expensesInMonth.expense_id === expenseId,
    );

    expect(expenseFound).toBeFalsy();
  });

  it('should not be able to remove non existing expense', async () => {
    const result = await removeExpenseService.execute({
      expenseId: 'non-exists-expense-id',
      userId: 'fake-user-id',
    });

    expect(result).toBeFalsy();
  });
});
