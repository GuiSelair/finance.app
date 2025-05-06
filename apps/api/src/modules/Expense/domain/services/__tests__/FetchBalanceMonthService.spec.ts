import { FetchBalanceMonthService } from '../FetchBalanceMonthService';
import { IExpensesMonthRepository } from '../../repositories/IExpensesMonthRepository';
import { IIncomesRepository } from '@modules/Settings/domain/repositories/IIncomeRepository';
import { IExpensesSharedRepository } from '../../repositories/IExpensesSharedRepository';

let expensesMonthRepositoryMocked: Partial<IExpensesMonthRepository>
let incomesRepositoryMocked: Partial<IIncomesRepository>
let expensesSharedRepositoryMocked: Partial<IExpensesSharedRepository>
let fetchBalanceMonthService: FetchBalanceMonthService

describe('GetBalanceOfMonthService use case - Unit test', () => {
  beforeEach(() => {
    expensesMonthRepositoryMocked = {
      fetchByMonthAndYear: jest
        .fn()
        .mockResolvedValue([
          { value_of_parcel: 10 },
          { value_of_parcel: 20 },
          { value_of_parcel: 30 },
          { value_of_parcel: 40 },
          { value_of_parcel: 50 },
        ]),
    };
    incomesRepositoryMocked = {
      findByMonthAndYear: jest.fn().mockResolvedValue({ value: 1000, month: 0, year: 2024 })
    }
    expensesSharedRepositoryMocked = {
      fetchByExpenseMonthIds: jest.fn().mockResolvedValue([
        { amount: 10 },
        { amount: 20 },
      ])
    }

    fetchBalanceMonthService = new FetchBalanceMonthService(
      expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
      incomesRepositoryMocked as unknown as IIncomesRepository,
      expensesSharedRepositoryMocked as unknown as IExpensesSharedRepository
    );
  })

  it('should be able to get balance of specific month', async () => {
    const balanceMonthServiceOutput = await fetchBalanceMonthService.execute({
      month: 0,
      year: 2024,
      user_id: 'fake-user-id',
    });

    expect(balanceMonthServiceOutput).toEqual({
      economy: 880.0,
      totalOfExpenses: 150.0,
      totalPayable: 120.0,
    });
  });
});
