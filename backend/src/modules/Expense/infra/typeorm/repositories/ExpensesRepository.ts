import { Repository } from 'typeorm';

import { ConnectionSource } from '../../../../../shared/infra/typeorm/bootstrap'
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
    this.repository = ConnectionSource.getRepository(Expense);
  }

  public async create(data: ICreateExpenseRepository): Promise<Expense> {
    const expense = this.repository.create(data);
    await this.repository.save(expense);

    return expense;
  }

  public async findByUserId(userId: string): Promise<Expense[] | null> {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }

  public async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Expense | null> {
    return this.repository.findOne({
      where: {
        id,
        user_id: userId,
      },
    });
  }

  public async remove(id: string): Promise<boolean> {
    const result = await this.repository.delete({
      id,
    });

    return !!result?.affected;
  }
}

export default ExpensesRepository;
