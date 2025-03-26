import { v4 as createUUID } from 'uuid';

import { ExpenseMonthSharePerson } from '../ExpenseMonthSharePerson';

describe('ExpenseMonthSharePerson model - Unit test', () => {
  it('should be able to create a new expense month share person', () => {
    const expenseMonthId = createUUID()
    const expenseMonthSharePerson = new ExpenseMonthSharePerson({
      expense_month_id: expenseMonthId,
      share_expense_person_id: 1,
      amount: 100.5,
      is_paid: false,
    }, 'create');

    expect(expenseMonthSharePerson).toHaveProperty('expense_month_id', expenseMonthId);
    expect(expenseMonthSharePerson).toHaveProperty('share_expense_person_id', 1);
    expect(expenseMonthSharePerson).toHaveProperty('amount', 100.5);
    expect(expenseMonthSharePerson).toHaveProperty('is_paid', false);
  });

  it('should be able to create a complete expense month share person', () => {
    const expenseMonthId = createUUID()
    const currentDate = new Date();

    const expenseMonthSharePerson = new ExpenseMonthSharePerson({
      id: 1,
      expense_month_id: expenseMonthId,
      share_expense_person_id: 1,
      amount: 100.5,
      is_paid: true,
      created_at: currentDate,
      updated_at: currentDate,
    });

    expect(expenseMonthSharePerson).toHaveProperty('id', 1);
    expect(expenseMonthSharePerson).toHaveProperty('expense_month_id', expenseMonthId);
    expect(expenseMonthSharePerson).toHaveProperty('share_expense_person_id', 1);
    expect(expenseMonthSharePerson).toHaveProperty('amount', 100.5);
    expect(expenseMonthSharePerson).toHaveProperty('is_paid', true);
    expect(expenseMonthSharePerson).toHaveProperty('created_at', currentDate);
    expect(expenseMonthSharePerson).toHaveProperty('updated_at', currentDate);
  });

  it('should be able to create a partial expense month share person', () => {
    const expenseMonthSharePerson = new ExpenseMonthSharePerson({
      id: 1,
    }, 'partial');

    expect(expenseMonthSharePerson).toHaveProperty('id', 1);
    expect(expenseMonthSharePerson.expense_month_id).toBeUndefined();
    expect(expenseMonthSharePerson.share_expense_person_id).toBeUndefined();
    expect(expenseMonthSharePerson.amount).toBeUndefined();
    expect(expenseMonthSharePerson.is_paid).toBeUndefined();
  });

  it('should throw an error if expense_month_id is invalid', () => {
    expect(() => {
      new ExpenseMonthSharePerson({
        expense_month_id: 'invalid-uuid',
        share_expense_person_id: 1,
        amount: 100.5,
        is_paid: false,
      });
    }).toThrow();
  });

  it('should throw an error if share_expense_person_id is not a number', () => {
    const expenseMonthId = createUUID()
    expect(() => {
      new ExpenseMonthSharePerson({
        expense_month_id: expenseMonthId,
        share_expense_person_id: 'invalid' as any,
        amount: 100.5,
        is_paid: false,
      });
    }).toThrow();
  });

  it('should throw an error if amount is not positive', () => {
    const expenseMonthId = createUUID()
    expect(() => {
      new ExpenseMonthSharePerson({
        expense_month_id: expenseMonthId,
        share_expense_person_id: 1,
        amount: -100.5,
        is_paid: false,
      });
    }).toThrow();
  });

  it('should throw an error if amount is not a number', () => {
    expect(() => {
      new ExpenseMonthSharePerson({
        expense_month_id: createUUID(),
        share_expense_person_id: 1,
        amount: 'invalid' as any,
        is_paid: false,
      });
    }).toThrow();
  });

  it('should throw an error if is_paid is not a boolean', () => {
    expect(() => {
      new ExpenseMonthSharePerson({
        expense_month_id: createUUID(),
        share_expense_person_id: 1,
        amount: 100.5,
        is_paid: 'invalid' as any,
      });
    }).toThrow();
  });

});
