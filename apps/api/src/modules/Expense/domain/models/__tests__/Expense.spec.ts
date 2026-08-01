import { v4 } from 'uuid';

import { Expense } from '../Expense';
import { ZodError } from 'zod';

describe('Expense model - Unit test', () => {
  it('should be able to create a expense object with validate as true', async () => {
    const expenseOutput = new Expense(
      {
        id: v4(),
        name: 'fake-card-name',
        amount: 100,
        parcel: 1,
        card_id: v4(),
        user_id: v4(),
        purchase_date: '2024-09-17',
        is_recurring: false,
        due_date: '2024-09-30',
        is_splitted: false,
      },
      true,
    );

    expect(expenseOutput).toBeInstanceOf(Expense);
  });

  it('should be able to create a expense object with validate as partial', async () => {
    const expenseOutput = new Expense(
      {
        id: v4(),
        name: 'fake-card-name',
        amount: 100,
      },
      'partial',
    );

    expect(expenseOutput).toBeInstanceOf(Expense);
  });

  it('should be able to create a expense object with validate as create', async () => {
    const expenseOutput = new Expense(
      {
        name: 'fake-card-name',
        amount: 100,
        parcel: 1,
        card_id: v4(),
        user_id: v4(),
        purchase_date: '2024-09-17',
        is_recurring: false,
        due_date: '2024-09-30',
        is_splitted: false,
      },
      'create',
    );

    expect(expenseOutput).toBeInstanceOf(Expense);
  });

  it('should be able to create a expense object with validate as false', async () => {
    const expenseOutput = new Expense({}, false);

    expect(expenseOutput).toBeInstanceOf(Expense);
  });

  it('should not be able to create a card object with invalid params', async () => {
    try {
      new Expense({
        id: v4(),
        name: 'fake-card-name',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it('should accept purchase_date up to today even after the process has aged', async () => {
    jest.resetModules();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-07-26T12:00:00.000Z'));

    const { Expense: ExpenseModel } = await import('../Expense');

    jest.setSystemTime(new Date('2026-08-01T12:00:00.000Z'));

    expect(
      () =>
        new ExpenseModel(
          {
            name: 'fake-card-name',
            amount: 100,
            parcel: 1,
            card_id: v4(),
            user_id: v4(),
            purchase_date: '2026-07-28',
            is_recurring: false,
            is_splitted: false,
          },
          'create',
        ),
    ).not.toThrow();

    jest.useRealTimers();
  });

  it('should reject purchase_date greater than today', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-08-01T12:00:00.000Z'));

    try {
      new Expense(
        {
          name: 'fake-card-name',
          amount: 100,
          parcel: 1,
          card_id: v4(),
          user_id: v4(),
          purchase_date: '2026-08-02',
          is_recurring: false,
          is_splitted: false,
        },
        'create',
      );
      fail('Expected ZodError to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      expect((error as ZodError).issues[0].message).toBe(
        'A data de compra deve ser menor ou igual a hoje',
      );
    } finally {
      jest.useRealTimers();
    }
  });
});
