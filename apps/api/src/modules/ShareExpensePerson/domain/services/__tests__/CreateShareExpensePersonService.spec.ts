import { v4 } from 'uuid'
import { IShareExpensesPersonRepository } from '../../repositories/IShareExpensesPersonRepository'
import { CreateShareExpensePersonService } from '../CreateShareExpensePersonService'
import { ShareExpensePerson } from '../../models/ShareExpensePerson'
import AppError from '@shared/errors/AppError'

let shareExpensesPersonRepositoryMocked: Partial<IShareExpensesPersonRepository>
let sut: CreateShareExpensePersonService

const fakeUserId = v4()

describe('CreateShareExpensePersonService service - Uni test', () => {
  beforeEach(() => {
    shareExpensesPersonRepositoryMocked = {
      create: jest.fn(),
      findByName: jest.fn()
    }
    sut = new CreateShareExpensePersonService(shareExpensesPersonRepositoryMocked as unknown as IShareExpensesPersonRepository)
  })

  it('should be able to create a new share expense person', async() =>{
    await sut.execute({
      name: 'fake-name',
      whatsapp: '55555555555',
      day_to_send_message: '5',
      user_id: fakeUserId
    })


    expect(shareExpensesPersonRepositoryMocked.create).toHaveBeenCalled
  })

  it('should not be able to create a new share expense person if exist an user with same name', async() => {
    shareExpensesPersonRepositoryMocked.findByName = jest.fn().mockResolvedValueOnce({ name: 'fake-same-name' })
    await expect(
      sut.execute({
        name: 'fake-same-name',
        whatsapp: '55555555555',
        day_to_send_message: '5',
        user_id: fakeUserId
      })
    ).rejects.toBeInstanceOf(AppError)
    expect(shareExpensesPersonRepositoryMocked.create).not.toHaveBeenCalled
  })
})
