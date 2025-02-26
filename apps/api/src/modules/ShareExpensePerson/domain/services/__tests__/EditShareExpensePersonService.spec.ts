import { v4 } from 'uuid'
import { IShareExpensesPersonRepository } from '../../repositories/IShareExpensesPersonRepository'
import { EditShareExpensePersonService } from '../EditShareExpensePersonService'
import AppError from '@shared/errors/AppError'

let shareExpensesPersonRepositoryMocked: Partial<IShareExpensesPersonRepository>
let sut: EditShareExpensePersonService

const fakeUserId = v4()

describe('EditShareExpensePersonService service - Uni test', () => {
  beforeEach(() => {
    shareExpensesPersonRepositoryMocked = {
      update: jest.fn(),
      findByName: jest.fn(),
      findById: jest.fn().mockResolvedValue({
        id: 1,
        name: 'fake-name',
        whatsapp: '55555555555',
        day_to_send_message: '5',
        user_id: fakeUserId
      })
    }
    sut = new EditShareExpensePersonService(shareExpensesPersonRepositoryMocked as unknown as IShareExpensesPersonRepository)
  })

  it('should be able to edit the share expense person', async() =>{
    await sut.execute({
      id: 1,
      name: 'fake-name',
      whatsapp: '66666666666',
      day_to_send_message: '10',
      user_id: fakeUserId
    })


    expect(shareExpensesPersonRepositoryMocked.update).toHaveBeenCalled()
  })

  it('should not be able to edit the share expense person if exist a person with same name', async() => {
    shareExpensesPersonRepositoryMocked.findByName = jest.fn().mockResolvedValueOnce({ name: 'fake-same-name' })
    await expect(
      sut.execute({
        id: 1,
        name: 'fake-same-name',
        whatsapp: '55555555555',
        day_to_send_message: '10',
        user_id: fakeUserId
      })
    ).rejects.toBeInstanceOf(AppError)
    expect(shareExpensesPersonRepositoryMocked.update).not.toHaveBeenCalled()
  })

  it('should not be able to edit the share expense person if person not exists', async() => {
    shareExpensesPersonRepositoryMocked.findById = jest.fn()
    await expect(
      sut.execute({
        id: 1,
        name: 'fake-nonexists-name',
        whatsapp: '55555555555',
        day_to_send_message: '10',
        user_id: fakeUserId
      })
    ).rejects.toBeInstanceOf(AppError)
    expect(shareExpensesPersonRepositoryMocked.update).not.toHaveBeenCalled()
  })
})
