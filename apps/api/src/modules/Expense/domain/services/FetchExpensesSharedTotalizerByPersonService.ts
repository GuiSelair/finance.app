import { inject, injectable } from "tsyringe";

import { IExpensesSharedRepository } from "@modules/Expense/domain/repositories/IExpensesSharedRepository";
import { IExpensesMonthRepository } from "../repositories/IExpensesMonthRepository";

interface FetchExpensesSharedTotalizerByPersonServiceInput {
  user_id: string
  month: number
  year: number
}

interface FetchExpensesSharedTotalizerByPersonServiceOutput {
  people: {
    id: number
    name: string
    whatsapp: string
    total_value: number
  }[]
}

@injectable()
export class FetchExpensesSharedTotalizerByPersonService {
  constructor(
    @inject("ExpensesMonthRepository")
    private readonly expensesMonthRepository: IExpensesMonthRepository,
    @inject("ExpensesSharedRepository")
    private readonly expensesSharedRepository: IExpensesSharedRepository,
  ) {}

  async execute(input: FetchExpensesSharedTotalizerByPersonServiceInput): Promise<FetchExpensesSharedTotalizerByPersonServiceOutput> {
    const expensesMonthFound = await this.expensesMonthRepository.fetchByMonthAndYear(input.month, input.year, input.user_id)
    const expensesMonthIds = expensesMonthFound?.map((expenseMonth) => expenseMonth.id)

    if (!expensesMonthIds) {
      return {
        people: []
      }
    }

    const expensesSharedFound = await this.expensesSharedRepository.fetchByExpenseMonthIds(expensesMonthIds)
    const expensesSharedGroupedByPersonId = expensesSharedFound?.reduce((acc, expenseShared) => {
      if (!expenseShared.share_expense_person) {
        return acc
      }

      acc[expenseShared.share_expense_person.id!] = {
        name: expenseShared.share_expense_person.name!,
        whatsapp: expenseShared.share_expense_person.whatsapp!,
        total_value: (acc[expenseShared.share_expense_person.id!]?.total_value || 0) + expenseShared.amount!
      }
      return acc
    }, {} as Record<string, { name: string, whatsapp: string, total_value: number }>)

    const output = Object.entries(expensesSharedGroupedByPersonId).map(([id, person]) => ({
      id: Number(id),
      name: person.name,
      whatsapp: person.whatsapp,
      total_value: person.total_value
    }))

    return {
      people: output
    }
  }
}