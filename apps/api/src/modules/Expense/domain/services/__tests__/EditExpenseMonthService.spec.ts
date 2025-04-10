import 'reflect-metadata'

import { randomUUID } from 'node:crypto'

import { IExpensesRepository } from '../../repositories/IExpensesRepository'
import { IExpensesMonthRepository } from '../../repositories/IExpensesMonthRepository'
import { EditExpenseMonthService } from '../EditExpenseMonthService'
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper'
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository'
import AppError from '@shared/errors/AppError'

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
  update: jest.fn()
} as Partial<IExpensesMonthRepository>
const expensesRepositoryMocked = {
  edit: jest.fn(),
  update: jest.fn()
}
const cardsRepositoryMocked = {
  findById: jest.fn().mockResolvedValue({ id: 'fake-card-id' })
}

const editExpenseMonthService = new EditExpenseMonthService(
  expensesRepositoryMocked as unknown as IExpensesRepository,
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
  cardsRepositoryMocked as unknown as ICardsRepository
)

describe('EditExpenseMonthService use case - Unit test', () => {
  it('should be able to edit expense month', async () => {
    const fakeExpenseMonthUuid = randomUUID()
    const fakeCardUuid = randomUUID()
    const valuesToChange = {
      is_paid: true,
      name: 'fake-expense-name-changed',
      description: 'fake-description-changed',
      value_of_parcel: 20,
      card_id: fakeCardUuid,
    }

    await editExpenseMonthService.execute({ id: fakeExpenseMonthUuid, user_id: randomUUID(), valuesToChange })

    expect(expensesMonthRepositoryMocked.update).toHaveBeenCalledWith({
      id: fakeExpenseMonthUuid,
      data:
        expect.objectContaining({
          id: fakeExpenseMonthUuid,
          is_paid: true,
          value_of_parcel: 20,
        })
    })
    expect(expensesRepositoryMocked.update).toHaveBeenCalledWith({
      id: 'fake-expense-id',
      data: expect.objectContaining({
        name: 'fake-expense-name-changed',
        description: 'fake-description-changed',
        card_id: fakeCardUuid,
      })
    })
  })

  it('should not be able update card id to unexistable card', async () => {
    cardsRepositoryMocked.findById.mockResolvedValueOnce(null)
    const fakeExpenseMonthUuid = randomUUID()
    const fakeCardUuid = randomUUID()
    const valuesToChange = {
      is_paid: true,
      name: 'fake-expense-name-changed',
      description: 'fake-description-changed',
      value_of_parcel: 20,
      card_id: fakeCardUuid,
    }

    await expect(
      editExpenseMonthService.execute({ id: fakeExpenseMonthUuid, user_id: randomUUID(), valuesToChange })
    ).rejects.toBeInstanceOf(AppError)

  })
})
