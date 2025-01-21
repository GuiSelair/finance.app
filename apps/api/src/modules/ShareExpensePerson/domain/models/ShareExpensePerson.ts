import { z } from "zod";

export class ShareExpensePerson {
  private static readonly schema = z.object({
      id: z.number(),
      name: z.string().min(3).max(20),
      whatsapp: z.string().length(10),
      day_to_send_message: z.enum(['1', '5', '10']).default('5'),
      user_id: z.string().uuid(),
      created_at: z.date().optional(),
      updated_at: z.date().optional(),
    });

    public readonly id?: string;
    public readonly name?: string;
    public readonly user_id?: string;
    public readonly day_to_send_message?: string;
    public readonly whatsapp?: string;
    public readonly created_at?: Date;
    public readonly updated_at?: Date;

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
