import { v4 } from 'uuid'
import { IShareExpensesPersonRepository } from '../../repositories/IShareExpensesPersonRepository'
import { DisableShareExpensePersonService } from '../DisableShareExpensePersonService'
import AppError from '@shared/errors/AppError'

let shareExpensesPersonRepositoryMocked: Partial<IShareExpensesPersonRepository>
let sut: DisableShareExpensePersonService

const fakeUserId = v4()

describe('DisableShareExpensePersonService service - Uni test', () => {
  beforeEach(() => {
    shareExpensesPersonRepositoryMocked = {
      disable: jest.fn(),
      findById: jest.fn().mockResolvedValue({
        id: 1,
        user_id: fakeUserId
      })
    }
    sut = new DisableShareExpensePersonService(shareExpensesPersonRepositoryMocked as unknown as IShareExpensesPersonRepository)
  })

  it('should be able to disable the share expense person', async() =>{
    await sut.execute({
      id: 1,
      user_id: fakeUserId
    })


    expect(shareExpensesPersonRepositoryMocked.disable).toHaveBeenCalled()
  })

  it('should not be able to disable the share expense person if person not exists', async() => {
    shareExpensesPersonRepositoryMocked.findById = jest.fn()
    await expect(
      sut.execute({
        id: 1,
        user_id: fakeUserId
      })
    ).rejects.toBeInstanceOf(AppError)
    expect(shareExpensesPersonRepositoryMocked.disable).not.toHaveBeenCalled()
  })
})
