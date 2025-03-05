import { v4 } from 'uuid'
import { IShareExpensesPersonRepository } from '../../repositories/IShareExpensesPersonRepository'
import { FindShareExpensePersonService } from '../FindShareExpensePersonService'

let shareExpensesPersonRepositoryMocked: Partial<IShareExpensesPersonRepository>
let sut: FindShareExpensePersonService

const fakeUserId = v4()

describe('FindShareExpensePersonService service - Uni test', () => {
  beforeEach(() => {
    shareExpensesPersonRepositoryMocked = {
      findById: jest.fn(),
    }
    sut = new FindShareExpensePersonService(shareExpensesPersonRepositoryMocked as unknown as IShareExpensesPersonRepository)
  })

  it('should be able to find the share expense people by id', async() =>{
    await sut.execute({
      id: 1,
      user_id: fakeUserId
    })


    expect(shareExpensesPersonRepositoryMocked.findById).toHaveBeenCalled()
  })
})
