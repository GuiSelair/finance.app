import { v4 } from 'uuid';

import { ExpenseMonth } from '../ExpenseMonth';
import { ZodError } from 'zod';

describe('ExpenseMonth model - Unit test', () => {
  it('should be able to create a expense month object with validate as true', async () => {
    const expenseMonthOutput = new ExpenseMonth(
      {
        id: v4(),
        expense_id: v4(),
        number_current_of_parcel: 1,
        number_total_of_parcel: 2,
        month: 0,
        year: 2024,
        value_of_parcel: 100,
      },
      true,
    );

    expect(expenseMonthOutput).toBeInstanceOf(ExpenseMonth);
  });

  it('should be able to create a expense month object with validate as partial', async () => {
    const expenseMonthOutput = new ExpenseMonth(
      {
        id: v4(),
        number_current_of_parcel: 1,
        number_total_of_parcel: 2,
        month: 0,
        year: 2024,
        value_of_parcel: 100,
      },
      'partial',
    );

    expect(expenseMonthOutput).toBeInstanceOf(ExpenseMonth);
  });

  it('should be able to create a expense month object with validate as create', async () => {
    const expenseMonthOutput = new ExpenseMonth(
      {
        expense_id: v4(),
        number_current_of_parcel: 1,
        number_total_of_parcel: 2,
        month: 0,
        year: 2024,
        value_of_parcel: 100,
      },
      'create',
    );

    expect(expenseMonthOutput).toBeInstanceOf(ExpenseMonth);
  });

  it('should be able to create a expense month object with validate as false', async () => {
    const expenseMonthOutput = new ExpenseMonth({}, false);

    expect(expenseMonthOutput).toBeInstanceOf(ExpenseMonth);
  });

  it('should not be able to create a card object with invalid params', async () => {
    try {
      new ExpenseMonth({
        id: v4(),
        month: 0,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
