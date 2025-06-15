import { ExpenseShared } from '../models/ExpenseShared';

export type FetchByPersonIdInput = {
  person_id: number;
  user_id: string;
  month: number;
  year: number;
}


export interface IExpensesSharedRepository {
  create(args: ExpenseShared[]): Promise<void>;
  fetchByExpenseMonthIds(expense_month_ids: string[]): Promise<ExpenseShared[]>;
  fetchByPersonId(input: FetchByPersonIdInput): Promise<ExpenseShared[]>;
}
