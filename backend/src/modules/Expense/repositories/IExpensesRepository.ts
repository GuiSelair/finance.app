import ICreateExpense from '../dtos/ICreateExpense';
import Expense from '../infra/typeorm/entities/Expense';

export default interface IExpensesRepository {
  create(args: ICreateExpense): Promise<Expense>;
  fetchAllExpenses(userId: string): Promise<Expense[] | null>;
  fetchAllRecurringExpenses(): Promise<Expense[] | undefined>;
  findByIdAndUserId(id: string, userId: string): Promise<Expense | null>;
  remove(id: string): Promise<boolean>;
}
