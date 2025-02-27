import { z } from "zod";

export class ShareExpensePerson {
  private static readonly schema = z.object({
      id: z.number(),
      name: z.string().min(3).max(20),
      whatsapp: z.string().length(11),
      day_to_send_message: z.enum(['1', '5', '10']).default('5').transform(value => Number(value)),
      user_id: z.string().uuid(),
      created_at: z.date().optional(),
      updated_at: z.date().optional(),
      deleted_at: z.date().optional().nullable(),
    });

    public readonly id?: number;
    public readonly name?: string;
    public readonly user_id?: string;
    public readonly day_to_send_message?: number | string;
    public readonly whatsapp?: string;
    public readonly created_at?: Date;
    public readonly updated_at?: Date;
    public readonly deleted_at?: Date;

    constructor(input: Partial<ShareExpensePerson>, validate: boolean | 'create' | 'partial' = true) {
      if (validate) {
        let schema = ShareExpensePerson.schema;

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
              user_id: true,
              id: true,
              day_to_send_message: true,
              name: true,
              whatsapp: true,
            });
            partialExpense.parse(input);
            break;
          }
        }
      }

      Object.assign(this, input);
    }
}
