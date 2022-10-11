import ICreateExpense from '../dtos/ICreateExpense';
import Expense from '../infra/typeorm/entities/Expense';

export default interface IExpensesRepository {
  create(args: ICreateExpense): Promise<Expense>;
  findByUserId(userId: string): Promise<Expense[] | undefined>;
}
