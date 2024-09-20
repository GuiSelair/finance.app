import { v4 as createUUID } from 'uuid';

import { ExpenseMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMapper';
import { IExpensesRepository } from '../IExpensesRepository';
import { FakeExpensesMonthRepository } from './FakeExpensesMonthRepository';
import { Expense } from '../../models/Expense';

export class FakeExpensesRepository implements IExpensesRepository {
  public repository: ExpenseMapper[] = [];

  public async create({
    name,
    description,
    amount,
    purchase_date,
    due_date,
    card_id,
    user_id,
    parcel,
  }: Expense): Promise<ExpenseMapper> {
    const expense = new ExpenseMapper();

    Object.assign(expense, {
      id: createUUID(),
      name,
      description,
      amount,
      purchase_date,
      due_date,
      parcel,
      card_id,
      user_id,
    });

    this.repository.push(expense);

    return expense;
  }

  public async fetch(userId: string): Promise<ExpenseMapper[] | null> {
    return this.repository.filter(expense => expense.user_id === userId);
  }

  public async findById(id: string, userId: string): Promise<ExpenseMapper | null> {
    return this.repository.find(expense => expense.id === id && expense.user_id === userId) || null;
  }

  public async remove(id: string): Promise<boolean> {
    const expenseIndexToRemove = this.repository.findIndex(expense => expense.id === id);

    if (expenseIndexToRemove < 0) return false;

    const expensesInMonthRepository = new FakeExpensesMonthRepository();
    this.repository.splice(expenseIndexToRemove);

    expensesInMonthRepository.repository = expensesInMonthRepository.repository.filter(
      expensesInMonth => expensesInMonth.expense_id !== id,
    );

    return true;
  }

  public async fetchRecurringExpenses(): Promise<ExpenseMapper[] | undefined> {
    throw new Error('Method not implemented.');
  }
}
