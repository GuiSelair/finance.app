import 'reflect-metadata';

import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository';
import { FetchExpensesMonthService } from '../FetchExpensesMonthService';

const expensesMonthRepositoryMocked = {
  findByMonthAndYear: jest
    .fn()
    .mockResolvedValue([
      { id: 'fake-expense-id-1' },
      { id: 'fake-expense-id-2' },
      { id: 'fake-expense-id-3' },
    ]),
};
const listAllExpensesInMonthService = new FetchExpensesMonthService(
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
);

describe('FetchExpensesMonthService use case - Unit Test', () => {
  it('should be able to return empty array if not existing expenses in month', async () => {
    expensesMonthRepositoryMocked.findByMonthAndYear.mockResolvedValueOnce([]);
    const response = await listAllExpensesInMonthService.execute({
      month: 12,
      year: 2022,
      user_id: 'fake-user-id',
    });

    expect(response).toBeInstanceOf(Array);
    expect(response).toEqual([]);
  });

  it('should be able to list expenses', async () => {
    const response = await listAllExpensesInMonthService.execute({
      month: 9,
      year: 2022,
      user_id: 'fake-user-id',
    });

    expect(response).toBeInstanceOf(Array);
    expect(response?.length).toBeGreaterThan(0);
  });
});
