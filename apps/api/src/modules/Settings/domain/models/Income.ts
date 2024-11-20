import { z } from 'zod';

export class Income {
  private static readonly schema = z.object({
    id: z.number().optional(),
    month: z.number().min(0).max(11),
    year: z.number().min(2020).max(new Date().getFullYear()),
    income: z.number().nonnegative().min(1),
    user_id: z.string().uuid(),
    created_at: z.date().optional(),
  });

  public readonly id?: number;
  public readonly month?: number;
  public readonly year?: number;
  public readonly income?: number;
  public readonly user_id?: string;
  public readonly created_at?: Date;

  constructor(input: Income, validate: boolean | 'partial' = true) {
    if (validate) {
      let schema = Income.schema;

      switch (validate) {
        case true: {
          schema.parse(input);
          break;
        }
        case 'partial': {
          const partialUser = schema.partial({
            income: true,
            month: true,
            year: true,
            user_id: true,
          });
          partialUser.parse(input);
          break;
        }
      }
    }

    Object.assign(this, input);
  }
}
