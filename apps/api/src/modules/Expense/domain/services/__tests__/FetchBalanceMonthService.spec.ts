import { FetchBalanceMonthService } from '../FetchBalanceMonthService';
import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository';
import { IIncomesRepository } from '@modules/Settings/domain/repositories/IIncomeRepository';

let expensesMonthRepositoryMocked: Partial<IExpensesMonthRepository>
let incomesRepositoryMocked: Partial<IIncomesRepository>
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

    fetchBalanceMonthService = new FetchBalanceMonthService(
      expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
      incomesRepositoryMocked as unknown as IIncomesRepository
    );
  })

  it('should be able to get balance of specific month', async () => {
    const balanceMonthServiceOutput = await fetchBalanceMonthService.execute({
      month: 0,
      year: 2024,
      user_id: 'fake-user-id',
    });

    expect(balanceMonthServiceOutput).toEqual({
      economy: 850.0,
      totalOfExpenses: 150.0,
      totalPayable: 150.0,
    });
  });
});
