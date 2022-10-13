import { v4 as createUUID } from 'uuid';

import ICreateExpense from '../../dtos/ICreateExpense';
import Expense from '../../infra/typeorm/entities/Expense';
import IExpensesRepository from '../IExpensesRepository';
import FakeExpensesInMonthRepository from './FakeExpensesInMonthRepository';

class FakeExpensesRepository implements IExpensesRepository {
  public repository: Expense[] = [];

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

  public async findByIdAndUserId(
    id: string,
    userId: string,
  ): Promise<Expense | undefined> {
    return this.repository.find(
      expense => expense.id === id && expense.user_id === userId,
    );
  }

  public async remove(id: string): Promise<boolean> {
    const expenseIndexToRemove = this.repository.findIndex(
      expense => expense.id === id,
    );

    if (expenseIndexToRemove < 0) return false;

    const expensesInMonthRepository = new FakeExpensesInMonthRepository();
    this.repository.splice(expenseIndexToRemove);

    expensesInMonthRepository.repository =
      expensesInMonthRepository.repository.filter(
        expensesInMonth => expensesInMonth.expense_id !== id,
      );

    return true;
  }
}

export default FakeExpensesRepository;
