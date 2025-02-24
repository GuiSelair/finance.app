import { v4 } from 'uuid'
import { IShareExpensesPersonRepository } from '../../repositories/IShareExpensesPersonRepository'
import { FetchShareExpensePersonService } from '../FetchShareExpensePersonService'

let shareExpensesPersonRepositoryMocked: Partial<IShareExpensesPersonRepository>
let sut: FetchShareExpensePersonService

const fakeUserId = v4()

describe('FetchShareExpensePersonService service - Uni test', () => {
  beforeEach(() => {
    shareExpensesPersonRepositoryMocked = {
      fetch: jest.fn(),
    }
    sut = new FetchShareExpensePersonService(shareExpensesPersonRepositoryMocked as unknown as IShareExpensesPersonRepository)
  })

  it('should be able to fetch the share expense people', async() =>{
    await sut.execute({
      user_id: fakeUserId
    })


    expect(shareExpensesPersonRepositoryMocked.fetch).toHaveBeenCalled()
  })
})
