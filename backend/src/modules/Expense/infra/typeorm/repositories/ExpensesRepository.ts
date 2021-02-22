import { Repository, getRepository } from 'typeorm';
import ICreateExpense from '../../../dtos/ICreateExpense';
import IExpensesRepository from '../../../repositories/IExpensesRepository';
import Expense from '../entities/Expense';

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>;

  constructor() {
    this.repository = getRepository(Expense);
  }

  public async create(data: ICreateExpense): Promise<Expense> {
    console.log(data);
    const expense = this.repository.create(data);

    await this.repository.save(expense);

    return expense;
  }
}

export default ExpensesRepository;
