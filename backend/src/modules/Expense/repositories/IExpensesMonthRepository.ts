import Expense from '../infra/typeorm/entities/Expense';
import ExpenseMonth from '../infra/typeorm/entities/ExpenseMonth';

export default interface IExpensesMonthRepository {
  create(args: Expense): Promise<ExpenseMonth[]>;
}
