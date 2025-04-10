import 'reflect-metadata';
import { FindExpenseMonthService } from '../FindExpenseMonthService'
import { IExpensesMonthRepository } from '../../repositories/IExpensesMonthRepository';

const expensesMonthRepositoryMocked = {
  findById: jest.fn().mockResolvedValue({ id: 'fake-expense-id', user_id: 'fake-user-id' }),
};
const findExpenseMonthService = new FindExpenseMonthService(
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository
);

describe('FindExpenseMonthService use case - Unit test', () => {
  it('should be able to find expense by id', async () => {
    const expenseMonthFound = await findExpenseMonthService.execute({
      expense_id: 'fake-expense-id',
      user_id:'fake-user-id'
    });

    expect(expenseMonthFound).toHaveProperty('id');
    expect(expenseMonthFound?.id).toEqual('fake-expense-id');
  })

  it('should be able to return null when expense not found by id', async () => {
    expensesMonthRepositoryMocked.findById.mockResolvedValueOnce(null);
    const expenseMonthNotFound  = await findExpenseMonthService.execute({
      expense_id: 'fake-expense-not-exist-id',
      user_id:'fake-user-id'
     });

    expect(expenseMonthNotFound).toBeUndefined();
  })

  it('should not be able to find expense month if user id not match', async () => {
    expensesMonthRepositoryMocked.findById.mockResolvedValueOnce(null);

    const expenseMonthNotFound  = await findExpenseMonthService.execute({
      expense_id: 'fake-expense-id',
      user_id:'fake-user-not-match-id'
     });

    expect(expenseMonthNotFound).toBeUndefined();
  })
})
