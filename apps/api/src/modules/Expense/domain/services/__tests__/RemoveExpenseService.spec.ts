import 'reflect-metadata';

import { RemoveExpenseService } from '../RemoveExpenseService';
import { IExpensesRepository } from '../../repositories/IExpensesRepository';

const expensesRepositoryMocked = {
  findById: jest.fn(),
  remove: jest.fn(),
};
const removeExpenseService = new RemoveExpenseService(
  expensesRepositoryMocked as unknown as IExpensesRepository,
);

describe('RemoveExpenseService - Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to remove expense', async () => {
    expensesRepositoryMocked.findById.mockResolvedValueOnce(true);
    await removeExpenseService.execute({
      expense_id: 'fake-expense-id',
      user_id: 'fake-user-id',
    });

    expect(expensesRepositoryMocked.remove).toHaveBeenCalledWith('fake-expense-id');
  });

  it('should not be able to remove non existing expense', async () => {
    const removeExpenseServiceOutput = await removeExpenseService.execute({
      expense_id: 'non-exists-expense-id',
      user_id: 'fake-user-id',
    });

    expect(removeExpenseServiceOutput).toEqual(false);
    expect(expensesRepositoryMocked.remove).not.toHaveBeenCalledWith('fake-expense-id');
  });
});
