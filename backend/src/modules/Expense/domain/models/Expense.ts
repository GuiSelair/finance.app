import { z } from 'zod';

export class Expense {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    name: z.string().min(4).max(40),
    amount: z.number().positive(),
    parcel: z.number().positive(),
    card_id: z.string().uuid(),
    user_id: z.string().uuid(),
    purchase_date: z.coerce.date().max(new Date()),
    is_recurring: z.boolean(),
    due_date: z.coerce.date().optional(),
    description: z.string().max(120).optional(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
  });

  public readonly id?: string;
  public readonly name?: string;
  public readonly amount?: number;
  public readonly parcel?: number;
  public readonly card_id?: string;
  public readonly user_id?: string;
  public readonly purchase_date?: string;
  public readonly is_recurring?: boolean;
  public readonly due_date?: string;
  public readonly description?: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(input: Partial<Expense>, validate: boolean | 'create' | 'partial' = true) {
    if (validate) {
      let schema = Expense.schema;

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
            card_id: true,
            user_id: true,
            purchase_date: true,
            is_recurring: true,
            parcel: true,
          });
          partialExpense.parse(input);
          break;
        }
      }
    }

    Object.assign(this, input);
  }
}
