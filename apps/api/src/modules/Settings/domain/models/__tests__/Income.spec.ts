import { v4 as createUUID } from 'uuid';

import { Income } from '../Income';
import { ZodError } from 'zod';

describe('Income model - Unit test', () => {
  it('should be able to create a income object with validate as true', async () => {
    const incomeOutput = new Income(
      {
        month: 1,
        year: 2021,
        income: 1000,
        user_id: createUUID(),
      },
      true,
    );

    expect(incomeOutput).toBeInstanceOf(Income);
  });

  it('should be able to create a income object with validate as partial', async () => {
    const incomeOutput = new Income(
      {
        income: 1000,
        month: 1,
        year: 2021,
      },
      'partial',
    );

    expect(incomeOutput).toBeInstanceOf(Income);
  });

  it('should be able to create a income object with validate as false', async () => {
    const incomeOutput = new Income({}, false);

    expect(incomeOutput).toBeInstanceOf(Income);
  });

  it('should not be able to create a income object with invalid params', async () => {
    try {
      new Income({
        // @ts-expect-error - Testing invalid params
        id: createUUID(),
        year: 21
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      expect((error as ZodError).flatten()).toEqual(
        expect.objectContaining({
          fieldErrors: expect.objectContaining({
            id: ['Expected number, received string'],
            year: ['Year must be in the format YYYY and greater than 2020'],
          }),
        })
      )
    }
  });
});
