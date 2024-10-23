import 'reflect-metadata';
import { v4 } from 'uuid';

import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository';
import { IExpensesRepository } from '../../repositories/IExpensesRepository';

import { InsertRecurringExpensesService } from '../InsertRecurringExpensesService';

const expensesRepositoryMocked = {
  fetchRecurringExpenses: jest.fn(),
};

const expensesMonthRepositoryMocked = {
  fetchByMonthAndYear: jest.fn(),
  create: jest.fn(),
};

describe('InsertRecurringExpensesInNextMonthsService use case - Unit Test', () => {
  jest.useFakeTimers().setSystemTime(new Date('2002-01-08T00:00:00.000Z'));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to insert recurring expenses in next month', async () => {
    const expenseId = v4();
    const recurringExpensesMocked = [
      {
        id: expenseId,
        amount: 100,
      },
    ];
    const expensesInMonthMocked = [
      {
        expense_id: 'fake-expense-id',
        number_current_of_parcel: 1,
        number_total_of_parcel: 2,
        value_of_parcel: 52.5,
        month: 0,
        year: 2002,
      },
    ];

    expensesRepositoryMocked.fetchRecurringExpenses.mockResolvedValueOnce(recurringExpensesMocked);
    expensesMonthRepositoryMocked.fetchByMonthAndYear.mockResolvedValueOnce(expensesInMonthMocked);

    const sut = new InsertRecurringExpensesService(
      expensesRepositoryMocked as unknown as IExpensesRepository,
      expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
    );
    await sut.execute();

    expect(expensesMonthRepositoryMocked.create).toHaveBeenCalled();
    expect(expensesMonthRepositoryMocked.create).toHaveBeenCalledWith([
      expect.objectContaining({
        expense_id: expenseId,
        is_paid: false,
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: 100,
        month: 1,
        year: 2002,
      }),
    ]);
  });

  it('should not be able to insert recurring expenses in next month if expense already inserted', async () => {
    const expenseId = v4();
    const recurringExpensesMocked = [
      {
        id: expenseId,
        amount: 100,
      },
    ];
    const expensesInMonthMocked = [
      {
        expense_id: expenseId,
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: 100,
        month: 0,
        year: 2002,
      },
    ];

    expensesRepositoryMocked.fetchRecurringExpenses.mockResolvedValueOnce(recurringExpensesMocked);
    expensesMonthRepositoryMocked.fetchByMonthAndYear.mockResolvedValueOnce(expensesInMonthMocked);

    const sut = new InsertRecurringExpensesService(
      expensesRepositoryMocked as unknown as IExpensesRepository,
      expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
    );
    await sut.execute();

    expect(expensesMonthRepositoryMocked.create).not.toHaveBeenCalled();
  });

  it('should not be able to insert recurring expenses when not exists one', async () => {
    const recurringExpensesMocked = null;
    const expensesInMonthMocked = [
      {
        expense_id: v4(),
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: 100,
        month: 0,
        year: 2002,
      },
    ];

    expensesRepositoryMocked.fetchRecurringExpenses.mockResolvedValueOnce(recurringExpensesMocked);
    expensesMonthRepositoryMocked.fetchByMonthAndYear.mockResolvedValueOnce(expensesInMonthMocked);

    const sut = new InsertRecurringExpensesService(
      expensesRepositoryMocked as unknown as IExpensesRepository,
      expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
    );
    await sut.execute();

    expect(expensesMonthRepositoryMocked.create).not.toHaveBeenCalled();
  });
});
