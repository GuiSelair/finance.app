import 'reflect-metadata'

import { IExpensesRepository } from '../../repositories/IExpensesRepository'
import { IExpensesMonthRepository } from '../../repositories/IExpensesInMonthRepository'
import { EditExpenseMonthService } from '../EditExpenseMonthService'
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper'

const expensesMonthRepositoryMocked = {
  findById: jest.fn().mockResolvedValue({
    id: 'fake-expense-month-id',
    expense: {
      id: 'fake-expense-id',
      name: 'fake-expense-name',
      description: 'fake-description',
      amount: 10,
      user_id: 'fake-user-id',
      card_id: 'fake-card-id',
    },
    is_paid: false,
    value_of_parcel: 10,
    expense_id: 'fake-expense-id',
  } as ExpenseMonthMapper),
}
const expensesRepositoryMocked = {
  edit: jest.fn(),
}

const editExpenseMonthService = new EditExpenseMonthService(
  expensesRepositoryMocked as unknown as IExpensesRepository,
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository
)

describe.skip('EditExpenseMonthService use case - Unit test', () => {
  it('should be able to edit expense month', async () => {
    const valuesToChange = {
      is_paid: true,
      name: 'fake-expense-name-changed',
      description: 'fake-description-changed',
      value_of_parcel: 20,
      card_id: 'fake-card-id-changed',
    }

    const expenseMonthChangedResponse = await editExpenseMonthService.execute({ id: 'fake-expense-month-id', user_id: 'fake-user-id', valuesToChange })
    expect(expenseMonthChangedResponse).toEqual(
      expect.objectContaining({
        id: 'fake-expense-month-id',
        expense_id: 'fake-expense-id',
        is_paid: true,
        value_of_parcel: 20,
        expense: expect.objectContaining({
          name: 'fake-expense-name-changed',
          description: 'fake-description-changed',
          card_id: 'fake-card-id-changed',
        })
      })
    )
  })
})
