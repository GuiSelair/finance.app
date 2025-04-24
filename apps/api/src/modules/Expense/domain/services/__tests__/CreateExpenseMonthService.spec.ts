import 'reflect-metadata';
import { v4 } from 'uuid';

import { IExpensesMonthRepository } from '../../repositories/IExpensesMonthRepository';
import { CreateExpenseMonthService } from '../CreateExpenseMonthService';
import { Expense } from '../../models/Expense';
import { ExpenseMonth } from '../../models/ExpenseMonth';

const expensesMonthRepositoryMocked = {
  create: jest.fn(),
};
const createExpenseMonthService = new CreateExpenseMonthService(
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
);

describe('CreateExpenseMonthService use case - Unit test', () => {
  it('should be able to create correctly parcel of expense', async () => {
    const expenseId = v4();
    await createExpenseMonthService.execute({
      expense: new Expense(
        {
          id: expenseId,
          name: 'fake-expense-name',
          amount: 500,
          parcel: 2,
          card_id: v4(),
          user_id: v4(),
          purchase_date: '2024-09-15',
          is_splitted: false,
        },
        'partial',
      ),
      manual_expense_date: '2024-09',
    });

    expect(expensesMonthRepositoryMocked.create).toHaveBeenCalledWith([
      new ExpenseMonth(
        {
          expense_id: expenseId,
          number_current_of_parcel: 1,
          number_total_of_parcel: 2,
          value_of_parcel: 250,
          month: 8,
          year: 2024,
          is_paid: false,
        },
        false,
      ),
      new ExpenseMonth(
        {
          expense_id: expenseId,
          number_current_of_parcel: 2,
          number_total_of_parcel: 2,
          value_of_parcel: 250,
          month: 9,
          year: 2024,
          is_paid: false,
        },
        false,
      ),
    ]);
  });

  it.skip('should be able to create expense in next month if card turning day was past', async () => {
    const expenseId = v4();
    await createExpenseMonthService.execute({
      expense: new Expense(
        {
          id: expenseId,
          name: 'fake-expense-name',
          amount: 500,
          parcel: 2,
          card_id: v4(),
          user_id: v4(),
          purchase_date: '2024-08-21',
        },
        'partial',
      ),
      manual_expense_date: '2024-09',
    });

    expect(expensesMonthRepositoryMocked.create).toHaveBeenCalledWith([
      new ExpenseMonth(
        {
          expense_id: expenseId,
          number_current_of_parcel: 1,
          number_total_of_parcel: 2,
          value_of_parcel: 250,
          month: 8,
          year: 2024,
          is_paid: false,
        },
        false,
      ),
      new ExpenseMonth(
        {
          expense_id: expenseId,
          number_current_of_parcel: 2,
          number_total_of_parcel: 2,
          value_of_parcel: 250,
          month: 9,
          year: 2024,
          is_paid: false,
        },
        false,
      ),
    ]);
  });

  it.skip('should be able to create expense in current month if card turning day not was past', async () => {
    const expenseId = v4();
    await createExpenseMonthService.execute({
      expense: new Expense(
        {
          id: expenseId,
          name: 'fake-expense-name',
          amount: 500,
          parcel: 2,
          card_id: v4(),
          user_id: v4(),
          purchase_date: '2024-08-19',
        },
        'partial',
      ),
      manual_expense_date: '2024-09',
    });

    expect(expensesMonthRepositoryMocked.create).toHaveBeenCalledWith([
      new ExpenseMonth(
        {
          expense_id: expenseId,
          number_current_of_parcel: 1,
          number_total_of_parcel: 2,
          value_of_parcel: 250,
          month: 7,
          year: 2024,
          is_paid: false,
        },
        false,
      ),
      new ExpenseMonth(
        {
          expense_id: expenseId,
          number_current_of_parcel: 2,
          number_total_of_parcel: 2,
          value_of_parcel: 250,
          month: 8,
          year: 2024,
          is_paid: false,
        },
        false,
      ),
    ]);
  });
});
