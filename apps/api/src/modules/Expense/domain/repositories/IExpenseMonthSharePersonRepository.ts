import { ExpenseMonthSharePerson } from "../models/ExpenseMonthSharePerson";

export interface IExpenseMonthSharePersonRepository {
  create(args: ExpenseMonthSharePerson): Promise<ExpenseMonthSharePerson>;
}
