import { z } from 'zod';
import { ExpenseMonth } from './ExpenseMonth';
import { ShareExpensePerson } from '@modules/ShareExpensePerson/domain/models/ShareExpensePerson';

export class ExpenseShared {
  private static readonly schema = z.object({
    id: z.number(),
    expense_month_id: z.string().uuid(),
    share_expense_person_id: z.number(),
    amount: z.number().positive(),
    is_paid: z.boolean().optional().default(false),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
  });

  public readonly id?: number;
  public readonly expense_month_id?: string;
  public readonly expense_month?: ExpenseMonth;
  public readonly share_expense_person_id?: number;
  public readonly share_expense_person?: ShareExpensePerson;
  public readonly amount?: number;
  public readonly is_paid?: boolean;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(input: Partial<ExpenseShared>, validate: boolean | 'create' | 'partial' = true) {
    if (validate) {
      let schema = ExpenseShared.schema;

      switch (validate) {
        case true: {
          schema.parse(input);
          break;
        }
        case 'create': {
          const createExpenseShare = schema.partial({
            id: true,
          });
          createExpenseShare.parse(input);
          break;
        }
        case 'partial': {
          const partialExpenseShare = schema.partial({
            expense_month_id: true,
            share_expense_person_id: true,
            amount: true,
            is_paid: true,
          });
          partialExpenseShare.parse(input);
          break;
        }
      }
    }

    Object.assign(this, input);
  }
}
