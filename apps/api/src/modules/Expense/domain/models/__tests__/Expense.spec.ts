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
});
