import { z } from 'zod';

export enum CardFlags {
  VISA = 'visa',
  MASTERCARD = 'mastercard',
  BANKSLIP = 'bank_slip',
}

export class Card {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2).max(20).trim(),
    flag: z.enum([CardFlags.MASTERCARD, CardFlags.VISA, CardFlags.BANKSLIP]),
    due_day: z.number().min(1).max(31),
    turning_day: z.number().min(1).max(31),
    user_id: z.string().uuid(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
  });

  public readonly id?: number;
  public readonly name: string;
  public readonly flag: string;
  public readonly due_day: number;
  public readonly turning_day: number;
  public readonly user_id: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(input: Card, validate: boolean | 'create' | 'partial' = true) {
    if (validate) {
      let schema = Card.schema;

      switch (validate) {
        case true: {
          schema.parse(input);
          break;
        }
        case 'create': {
          const createUser = schema.partial({
            id: true,
          });
          createUser.parse(input);
          break;
        }
        case 'partial': {
          const partialUser = schema.partial({
            id: true,
            name: true,
            flag: true,
            due_day: true,
            turning_day: true,
          });
          partialUser.parse(input);
          break;
        }
      }
    }

    Object.assign(this, input);
  }
}
