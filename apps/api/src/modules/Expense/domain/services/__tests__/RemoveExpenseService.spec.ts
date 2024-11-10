import 'reflect-metadata';

import { RemoveExpenseService } from '../RemoveExpenseService';
import { IExpensesRepository } from '../../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository';
import AppError from '@shared/errors/AppError';

const expensesRepositoryMocked = {
  findById: jest.fn().mockResolvedValue(true),
  remove: jest.fn().mockResolvedValue(true),
};
const expensesMonthRepositoryMocked = {
  remove: jest.fn().mockResolvedValue(true),
  findById: jest.fn().mockResolvedValue(true),
  fetchByExpenseId: jest.fn().mockResolvedValue([[], 2])
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

    expect(expensesRepositoryMocked.remove).toHaveBeenCalledWith({ id: 'fake-expense-id' });
  });

  it('should not be able to remove non existing expense', async () => {
    expensesRepositoryMocked.findById.mockResolvedValueOnce(null);

    await expect(
      removeExpenseService.execute({
        expense_id: 'non-exists-expense-id',
        user_id: 'fake-user-id',
        is_only_one: false
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove one parcel of expense', async () => {
    await removeExpenseService.execute({
      expense_id: 'fake-expense-month-id',
      user_id: 'fake-user-id',
      is_only_one: true,
    });

    expect(expensesMonthRepositoryMocked.remove).toHaveBeenCalledWith({ id: 'fake-expense-month-id' });
  });

  it('should not be able to remove non existing parcel of expense month', async () => {
    expensesMonthRepositoryMocked.findById.mockResolvedValueOnce(false);

    await expect(
      removeExpenseService.execute({
        expense_id: 'non-exists-expense-month-id',
        user_id: 'fake-user-id',
        is_only_one: true
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove one parcel of expense and if it is the last one, remove father expense too', async () => {
    const fakeExpenseMonth = {
      id: 'fake-expense-month-id',
      user_id: 'fake-user-id',
      expense_id: 'fake-expense-id',
    }
    expensesMonthRepositoryMocked.fetchByExpenseId.mockResolvedValueOnce([[fakeExpenseMonth], 1]);
    expensesMonthRepositoryMocked.findById.mockResolvedValueOnce(fakeExpenseMonth);
    const removeExpenseMonthServiceOutput = await removeExpenseService.execute({
      expense_id: 'fake-expense-month-id',
      user_id: 'fake-user-id',
      is_only_one: true
     });

     expect(removeExpenseMonthServiceOutput).toEqual(true);
     expect(expensesMonthRepositoryMocked.remove).toHaveBeenCalledWith({ id: 'fake-expense-month-id' });
     expect(expensesRepositoryMocked.remove).toHaveBeenCalledWith({ id: 'fake-expense-id' });
  })
});
