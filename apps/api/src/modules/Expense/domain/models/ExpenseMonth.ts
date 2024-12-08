import { z } from 'zod';
import { Expense } from './Expense';

export class ExpenseMonth {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    expense_id: z.string().uuid(),
    number_current_of_parcel: z.number().positive(),
    number_total_of_parcel: z.number().positive(),
    month: z.number().min(0).max(11),
    year: z.number().positive(),
    value_of_parcel: z.number().positive(),
    is_paid: z.boolean().optional().default(false),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
  });

  public readonly id?: string;
  public readonly expense_id?: string;
  public readonly number_current_of_parcel?: number;
  public readonly number_total_of_parcel?: number;
  public readonly month?: number;
  public readonly year?: number;
  public readonly value_of_parcel?: number;
  public readonly is_paid?: boolean;
  public readonly expense?: Expense;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(input: Partial<ExpenseMonth>, validate: boolean | 'create' | 'partial' = true) {
    if (validate) {
      let schema = ExpenseMonth.schema;

      switch (validate) {
        case true: {
          schema.parse(input);
          break;
        }
        case 'create': {
          const createExpense = schema.partial({
            id: true,
          });
          createExpense.parse(input);
          break;
        }
        case 'partial': {
          const partialExpense = schema.partial({
            is_paid: true,
            expense_id: true,
            number_current_of_parcel: true,
            number_total_of_parcel: true,
            month: true,
            year: true,
            value_of_parcel: true,
          });
          partialExpense.parse(input);
          break;
        }
      }
    }

    Object.assign(this, input);
  }
}
