import { v4 } from 'uuid'

import { IIncomesRepository } from '../../repositories/IIncomeRepository'
import { Income } from '../../models/Income'
import { ModifyIncomeMonthService } from '../ModifyIncomeMonthService'

let incomesRepositoryMocked: Partial<IIncomesRepository>
let sut: ModifyIncomeMonthService

describe('Modify incomes month use case - Unit test', () => {
  beforeEach(() => {
    incomesRepositoryMocked = {
      createOrUpdate: jest.fn().mockImplementation((income) => income)
    }
    sut = new ModifyIncomeMonthService(incomesRepositoryMocked as unknown as IIncomesRepository)
  })

  it('should be able to modify income', async () => {
    const serviceOutput = await sut.execute({ income: 400, month: 10, year: 2024, user_id: v4() })
    expect(serviceOutput.income).toBeInstanceOf(Income)
  })
})
