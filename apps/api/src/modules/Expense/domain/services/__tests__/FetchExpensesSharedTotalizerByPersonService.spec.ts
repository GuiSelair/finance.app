import "reflect-metadata"

import { FetchExpensesSharedTotalizerByPersonService } from "../FetchExpensesSharedTotalizerByPersonService"
import { IExpensesMonthRepository } from "@modules/Expense/domain/repositories/IExpensesMonthRepository"
import { IExpensesSharedRepository } from "@modules/Expense/domain/repositories/IExpensesSharedRepository"

let expensesMonthRepositoryMocked: Partial<IExpensesMonthRepository>
let expensesSharedRepositoryMocked: Partial<IExpensesSharedRepository>
let sut: FetchExpensesSharedTotalizerByPersonService

describe("FetchExpensesSharedTotalizerByPersonService use case - Unit test", () => {
  beforeEach(() => {
    expensesMonthRepositoryMocked = {
      fetchByMonthAndYear: jest.fn().mockResolvedValue([
        { id: "fake-expense-month-id-1" },
        { id: "fake-expense-month-id-2" },
        { id: "fake-expense-month-id-3" },
      ]),
    }
    expensesSharedRepositoryMocked = {
      fetchByExpenseMonthIds: jest.fn().mockResolvedValue([
        { amount: 10, share_expense_person: { id: 1, name: "fake-person-name-1" } },
        { amount: 20, share_expense_person: { id: 2, name: "fake-person-name-2" } },
        { amount: 30, share_expense_person: { id: 1, name: "fake-person-name-1" } },
      ]),
    }
    sut = new FetchExpensesSharedTotalizerByPersonService(
      expensesMonthRepositoryMocked as IExpensesMonthRepository,
      expensesSharedRepositoryMocked as IExpensesSharedRepository,
    )
  })

  it("should be able to fetch the expenses shared totalizer by person", async () => {
    const result = await sut.execute({
      month: 1,
      year: 2024,
      user_id: "fake-user-id",
    })

    expect(result).toEqual({
      people: [
        { id: 1, name: "fake-person-name-1", total_value: 40 },
        { id: 2, name: "fake-person-name-2", total_value: 20 },
      ],
    })
  });

  it("should return an empty array if there are no expenses shared", async () => {
    expensesSharedRepositoryMocked.fetchByExpenseMonthIds = jest.fn().mockResolvedValue([])

    const result = await sut.execute({
      month: 1,
      year: 2024,
      user_id: "fake-user-id",
    })

    expect(result).toEqual({
      people: [],
    })
  })
})

