import { Repository, getRepository } from 'typeorm';
import ICreateExpense from '../../../dtos/ICreateExpense';
import IExpensesRepository from '../../../repositories/IExpensesRepository';
import Expense from '../entities/Expense';

interface ICreateExpenseRepository extends ICreateExpense {
  share_with: string;
  value_of_each: string;
}

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>;

  constructor() {
    this.repository = getRepository(Expense);
  }

  public async create(data: ICreateExpenseRepository): Promise<Expense> {
    const expense = this.repository.create(data);
    await this.repository.save(expense);

    return expense;
  }

  public async findByUserId(userId: string): Promise<Expense[] | undefined> {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }
}

export default ExpensesRepository;
