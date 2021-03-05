import { Repository, getRepository } from 'typeorm';
import ICreateExpense from '../../../dtos/ICreateExpense';
import IExpensesRepository from '../../../repositories/IExpensesRepository';
import Expense from '../entities/Expense';
import ExpensesMonthRepository from './ExpensesMonthRepository';

class ExpensesRepository implements IExpensesRepository {
  private repository: Repository<Expense>;

  private expensesMonthRepository: ExpensesMonthRepository;

  constructor() {
    this.repository = getRepository(Expense);
    this.expensesMonthRepository = new ExpensesMonthRepository();
  }

  public async create(data: ICreateExpense): Promise<Expense> {
    const expense = this.repository.create(data);
    console.log(expense);
    await this.repository.save(expense);

    const expensesMonth = await this.expensesMonthRepository.create(expense);
    console.log(expensesMonth);

    return expense;
  }
}

export default ExpensesRepository;
