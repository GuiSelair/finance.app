import { Income } from '../../models/Income'
import { IIncomesRepository } from '../../repositories/IIncomeRepository'
import { FindIncomeMonthService } from '../FindIncomeMonthService'

let incomesRepositoryMocked: Partial<IIncomesRepository>
let sut: FindIncomeMonthService

describe('Find income month use case - Unit test', () => {
  beforeEach(() => {
    incomesRepositoryMocked = {
      findByMonthAndYear: jest.fn().mockResolvedValue({
        id: 1,
        month: 10,
        year: 2024,
        value: '3000',
      }),
    }
    sut = new FindIncomeMonthService(incomesRepositoryMocked as unknown as IIncomesRepository)
  })

  it('should be able to find an income from specific month and year', async () => {
    const serviceOutput = await sut.execute({ month: 10, year: 2024, user_id: 'fake-user-id' })
    expect(serviceOutput.income).toBeInstanceOf(Income)
    expect(serviceOutput.income?.income).toBe(3000)
  })

  it('should be able to return null income if not exists one', async () => {
    incomesRepositoryMocked.findByMonthAndYear = jest.fn().mockResolvedValueOnce(null)

    const serviceOutput = await sut.execute({ month: 10, year: 2024, user_id: 'fake-user-id' })
    expect(serviceOutput.income).toBeNull()
  })
})
