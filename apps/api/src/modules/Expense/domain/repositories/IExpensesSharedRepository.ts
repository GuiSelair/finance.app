import { ExpenseShared } from "../models/ExpenseShared";

export interface IExpensesSharedRepository {
  create(args: ExpenseShared[]): Promise<void>;
  fetchByExpenseMonthIds(expense_month_ids: string[]): Promise<ExpenseShared[]>;
}
