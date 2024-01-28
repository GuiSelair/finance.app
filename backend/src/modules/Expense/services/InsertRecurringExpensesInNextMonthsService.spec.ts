
import 'reflect-metadata';

import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository'
import IExpensesRepository from '../repositories/IExpensesRepository'

import { InsertRecurringExpensesInNextMonthsService } from './InsertRecurringExpensesInNextMonthsService'

const expensesRepositoryMock = {
  fetchAllRecurringExpenses: jest.fn()
};

const expensesInMonthRepository = {
  findByMonthAndYear: jest.fn(),
  create: jest.fn()
}

describe('InsertRecurringExpensesInNextMonthsService - Unit Test', () => {
  jest.useFakeTimers('modern').setSystemTime(new Date('2002-01-08T00:00:00.000Z'))
  it('should be able to insert recurring expenses in next month', async () => {
    const recurringExpensesMocked = [{
      id: 'fake-expense-id',
      amount: 100,
    }]
    const expensesInMonthMocked = [{
      expense_id: 'fake-other-expense-id',
      number_current_of_parcel: 1,
      number_total_of_parcel: 2,
      value_of_parcel: 52.50,
      month: 0,
      year: 2002,
    }]

    expensesRepositoryMock.fetchAllRecurringExpenses.mockResolvedValueOnce(recurringExpensesMocked);
    expensesInMonthRepository.findByMonthAndYear.mockResolvedValueOnce(expensesInMonthMocked);

    const sut = new InsertRecurringExpensesInNextMonthsService(
      expensesRepositoryMock as unknown as IExpensesRepository,
      expensesInMonthRepository as unknown as IExpensesInMonthRepository,
    );
    await sut.execute();

    expect(expensesInMonthRepository.create).toHaveBeenCalled();
    expect(expensesInMonthRepository.create).toHaveBeenCalledWith([
      expect.objectContaining({
        expense_id: 'fake-expense-id',
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: 100,
        month: 1,
        year: 2002,
      })
    ]);
  })

  it('should not be able to insert recurring expenses in next month if expense already inserted', async () => {
    const recurringExpensesMocked = [{
      id: 'fake-expense-id',
      amount: 100,
    }]
    const expensesInMonthMocked = [{
      expense_id: 'fake-expense-id',
      number_current_of_parcel: 1,
      number_total_of_parcel: 1,
      value_of_parcel: 100,
      month: 0,
      year: 2002,
    }]

    expensesRepositoryMock.fetchAllRecurringExpenses.mockResolvedValueOnce(recurringExpensesMocked);
    expensesInMonthRepository.findByMonthAndYear.mockResolvedValueOnce(expensesInMonthMocked);

    const sut = new InsertRecurringExpensesInNextMonthsService(
      expensesRepositoryMock as unknown as IExpensesRepository,
      expensesInMonthRepository as unknown as IExpensesInMonthRepository,
    );
    await sut.execute();

    expect(expensesInMonthRepository.create).not.toHaveBeenCalled();
  })

  it('should not be able to insert recurring expenses when not exists one', async () => {
    const recurringExpensesMocked = null
    const expensesInMonthMocked = [{
      expense_id: 'fake-expense-id',
      number_current_of_parcel: 1,
      number_total_of_parcel: 1,
      value_of_parcel: 100,
      month: 0,
      year: 2002,
    }]

    expensesRepositoryMock.fetchAllRecurringExpenses.mockResolvedValueOnce(recurringExpensesMocked);
    expensesInMonthRepository.findByMonthAndYear.mockResolvedValueOnce(expensesInMonthMocked);

    const sut = new InsertRecurringExpensesInNextMonthsService(
      expensesRepositoryMock as unknown as IExpensesRepository,
      expensesInMonthRepository as unknown as IExpensesInMonthRepository,
    );
    await sut.execute();

    expect(expensesInMonthRepository.create).not.toHaveBeenCalled();
  })
})
