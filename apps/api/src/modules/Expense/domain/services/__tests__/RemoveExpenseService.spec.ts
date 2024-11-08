import 'reflect-metadata';

import { RemoveExpenseService } from '../RemoveExpenseService';
import { IExpensesRepository } from '../../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository';

const expensesRepositoryMocked = {
  remove: jest.fn().mockResolvedValue(true),
};
const expensesMonthRepositoryMocked = {
  remove: jest.fn().mockResolvedValue(true),
};
const removeExpenseService = new RemoveExpenseService(
  expensesRepositoryMocked as unknown as IExpensesRepository,
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
);

describe('RemoveExpenseService - Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to remove expense', async () => {
    await removeExpenseService.execute({
      expense_id: 'fake-expense-id',
      user_id: 'fake-user-id',
      is_only_one: false,
    });

    expect(expensesRepositoryMocked.remove).toHaveBeenCalledWith({ id: 'fake-expense-id', user_id: 'fake-user-id' });
  });

  it('should not be able to remove non existing expense', async () => {
    expensesRepositoryMocked.remove.mockResolvedValueOnce(false);
    const removeExpenseServiceOutput = await removeExpenseService.execute({
      expense_id: 'non-exists-expense-id',
      user_id: 'fake-user-id',
      is_only_one: false
    });

    expect(removeExpenseServiceOutput).toEqual(false);
    expect(expensesRepositoryMocked.remove).not.toHaveBeenCalledWith('fake-expense-id');
  });

  it('should be able to remove one parcel of expense', async () => {
    await removeExpenseService.execute({
      expense_id: 'fake-expense-month-id',
      user_id: 'fake-user-id',
      is_only_one: true,
    });

    expect(expensesMonthRepositoryMocked.remove).toHaveBeenCalledWith({ id: 'fake-expense-month-id', user_id: 'fake-user-id' });
  });

  it('should not be able to remove non existing parcel of expense month', async () => {
    expensesMonthRepositoryMocked.remove.mockResolvedValueOnce(false);
    const removeExpenseMonthServiceOutput = await removeExpenseService.execute({
      expense_id: 'non-exists-expense-month-id',
      user_id: 'fake-user-id',
      is_only_one: true
    });

    expect(removeExpenseMonthServiceOutput).toEqual(false);
    expect(expensesMonthRepositoryMocked.remove).not.toHaveBeenCalledWith({ id: 'fake-expense-month-id', user_id: 'fake-user-id' });
  });
});
