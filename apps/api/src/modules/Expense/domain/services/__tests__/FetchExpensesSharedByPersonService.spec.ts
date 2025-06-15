import { ExpensesSharedRepository } from '@modules/Expense/infra/typeorm/repositories/ExpensesSharedRepository';

import { IExpensesSharedRepository } from '../../repositories/IExpensesSharedRepository';
import { FetchExpensesSharedByPersonService } from '../FetchExpensesSharedByPersonService';

let expensesSharedRepository: Partial<IExpensesSharedRepository> = {
  fetchByPersonId: jest.fn().mockResolvedValue([
    {
      id: 1,
      amount: 50,
      expense_month: {
        id: 1,
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        expense: {
          id: 1,
          name: 'fake-expense-name',
        },
      },
    },
    {
      id: 2,
      amount: 50,
      expense_month: {
        id: 2,
        number_current_of_parcel: 1,
        number_total_of_parcel: 2,
        expense: {
          id: 1,
          name: 'fake-expense-name-2',
        },
      },
    },
  ]),
};
let sut: FetchExpensesSharedByPersonService;

describe('FetchExpensesSharedByPersonService use case - Unit test', () => {
  beforeEach(() => {
    sut = new FetchExpensesSharedByPersonService(
      expensesSharedRepository as IExpensesSharedRepository,
    )
  })

  it('should be able to list all expenses shared by person in a determined month and year', async () => {
    const output = await sut.execute({
      month: 0,
      year: 2025,
      person_id: 1,
      user_id: 'fake-user-id',
    })

    expect(output).toEqual({
      expenses_shared_details: [
        {
          id: 1,
          name: 'fake-expense-name',
          current_parcel: 1,
          total_parcel: 1,
          amount: 50,
        },
        {
          id: 2,
          name: 'fake-expense-name-2',
          current_parcel: 1,
          total_parcel: 2,
          amount: 50,
        },
      ],
    })
  })

  it('should not be able to list all expenses shared by person in a determined month and year if the person does not have any expenses shared', async () => {
    expensesSharedRepository.fetchByPersonId = jest.fn().mockResolvedValue(null);

    const output = await sut.execute({
      month: 0,
      year: 2025,
      person_id: 1,
      user_id: 'fake-user-id',
    })

    expect(output).toBeNull();
  })
})