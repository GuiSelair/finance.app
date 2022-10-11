import { v4 as createUUID } from 'uuid';

import ICreateExpense from '../../dtos/ICreateExpense';
import Expense from '../../infra/typeorm/entities/Expense';
import IExpensesRepository from '../IExpensesRepository';

class FakeExpensesRepository implements IExpensesRepository {
  private repository: Expense[] = [];

  public async create({
    name,
    description,
    amount,
    purchase_date,
    due_date,
    card_id,
    user_id,
    parcel,
    value_of_each,
    share_with,
    split_expense,
  }: ICreateExpense): Promise<Expense> {
    const expense = new Expense();

    Object.assign(expense, {
      id: createUUID(),
      name,
      description,
      amount,
      purchase_date,
      due_date,
      value_of_each,
      parcel,
      share_with,
      split_expense,
      card_id,
      user_id,
    });

    this.repository.push(expense);

    return expense;
  }

  public async findByUserId(userId: string): Promise<Expense[] | undefined> {
    return this.repository.filter(expense => expense.user_id === userId);
  }
}

export default FakeExpensesRepository;
