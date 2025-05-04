import { ExpenseShared } from "../models/ExpenseShared";

export interface IExpensesSharedRepository {
  create(args: ExpenseShared[]): Promise<void>;
}
