import ICreateExpense from '../dtos/ICreateExpense';
import Expense from '../infra/typeorm/entities/Expense';

export default interface IExpensesRepository {
  create(args: ICreateExpense): Promise<Expense>;
  findByUserId(userId: string): Promise<Expense[] | undefined>;
  findByIdAndUserId(id: string, userId: string): Promise<Expense | undefined>;
  remove(id: string): Promise<boolean>;
}
