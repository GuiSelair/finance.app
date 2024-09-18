import { z } from 'zod';

export class User {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    name: z.string().min(5).max(100).trim(),
    email: z.string().email().trim(),
    password: z.string(),
    created_at: z.date().optional(),
    updated_at: z.date().optional(),
  });

  public readonly id?: string;
  public readonly name?: string;
  public readonly email?: string;
  public readonly password?: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(input: User, validate: boolean | 'partial' | 'create' = true) {
    if (validate) {
      let schema = User.schema;

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
            email: true,
            password: true,
          });
          partialUser.parse(input);
          break;
        }
      }
    }

    Object.assign(this, input);
  }
}
