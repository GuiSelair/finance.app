import { Repository, getRepository } from 'typeorm';
import ICreateExpense from '../../../dtos/ICreateExpense';
import IExpensesRepository from '../../../repositories/IExpensesRepository';
import Expense from '../entities/Expense';
import ExpensesMonthRepository from './ExpensesMonthRepository';

interface ICreateExpenseRepository extends ICreateExpense {
  share_with: string;
  value_of_each: string;
}

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>;

  private expensesMonthRepository: ExpensesMonthRepository;

  constructor() {
    this.repository = getRepository(Expense);
    this.expensesMonthRepository = new ExpensesMonthRepository();
  }

  public async create(data: ICreateExpenseRepository): Promise<Expense> {
    const expense = this.repository.create(data);
    await this.repository.save(expense);
    await this.expensesMonthRepository.create(expense);

    return expense;
  }
}

export default ExpensesRepository;
