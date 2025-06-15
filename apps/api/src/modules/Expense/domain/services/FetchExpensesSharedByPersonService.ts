import { inject, injectable } from 'tsyringe';

import { IExpensesSharedRepository } from '@modules/Expense/domain/repositories/IExpensesSharedRepository';

export type FetchExpensesSharedByPersonInput = {
	person_id: number;
	month: number;
	year: number;
	user_id: string;
};

export type FetchExpensesSharedByPersonOutput = {
  expenses_shared_details: {
    id: number;
    name: string;
    current_parcel: number;
    total_parcel: number;
    amount: number;
  }[]
} | null;

@injectable()
export class FetchExpensesSharedByPersonService {
	constructor(
    @inject("ExpensesSharedRepository")
    private readonly expensesSharedRepository: IExpensesSharedRepository,
  ) {}

	async execute(input: FetchExpensesSharedByPersonInput): Promise<FetchExpensesSharedByPersonOutput> {
    const expensesSharedFound = await this.expensesSharedRepository.fetchByPersonId({
      person_id: input.person_id,
      user_id: input.user_id,
      month: input.month,
      year: input.year,
    })

    if (!expensesSharedFound?.length) {
      return null;
    }

    const expensesSharedDetails = expensesSharedFound.map((expenseShared) => ({
      id: expenseShared.id!,
      name: expenseShared.expense_month?.expense?.name!,
      current_parcel: expenseShared.expense_month?.number_current_of_parcel!,
      total_parcel: expenseShared.expense_month?.number_total_of_parcel!,
      amount: expenseShared.amount!,
    }))


    return {
      expenses_shared_details: expensesSharedDetails,
    }
	}
}