import 'reflect-metadata';
import { FetchBalanceMonthService } from '../FetchBalanceMonthService';
import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository';

const expensesMonthRepositoryMocked = {
  findByMonthAndYear: jest
    .fn()
    .mockResolvedValue([
      { value_of_parcel: 10 },
      { value_of_parcel: 20 },
      { value_of_parcel: 30 },
      { value_of_parcel: 40 },
      { value_of_parcel: 50 },
    ]),
};
const fetchBalanceMonthService = new FetchBalanceMonthService(
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
);

describe('GetBalanceOfMonthService use case - Unit test', () => {
  it('should be able to get balance of specific month', async () => {
    const balanceMonthServiceOutput = await fetchBalanceMonthService.execute({
      month: 0,
      year: 2024,
      user_id: 'fake-user-id',
    });

    expect(balanceMonthServiceOutput).toEqual({
      economy: 0,
      totalOfExpenses: 150.0,
      totalPayable: 150.0,
    });
  });
});
