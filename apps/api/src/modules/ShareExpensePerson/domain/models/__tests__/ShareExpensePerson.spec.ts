import { v4 as createUUID } from 'uuid';

import { ShareExpensePerson } from '../ShareExpensePerson';
import { ZodError } from 'zod';

describe('ShareExpensePerson model - Unit test', () => {
  it('should be able to create a shareExpensePerson object with validate as true', async () => {
    const shareExpensePersonOutput = new ShareExpensePerson(
      {
        id: 1,
        name: 'fake-name',
        day_to_send_message: '5',
        whatsapp: '55555555555',
        user_id: createUUID(),
      },
      true,
    );

    expect(shareExpensePersonOutput).toBeInstanceOf(ShareExpensePerson);
  });

  it('should be able to create a shareExpensePerson object with validate as partial', async () => {
    const shareExpensePersonOutput = new ShareExpensePerson(
      {
        name: 'fake-name',
        whatsapp: '55555555555',
      },
      'partial',
    );

    expect(shareExpensePersonOutput).toBeInstanceOf(ShareExpensePerson);
  });

  it('should be able to create a shareExpensePerson object with validate as false', async () => {
    const incomeOutput = new ShareExpensePerson({}, false);

    expect(incomeOutput).toBeInstanceOf(ShareExpensePerson);
  });

  it('should not be able to create a shareExpensePerson object with invalid params', async () => {
    try {
      new ShareExpensePerson({
        // @ts-expect-error - Testing invalid params
        id: createUUID(),
        whatsapp: '555'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      expect((error as ZodError).flatten()).toEqual(
        expect.objectContaining({
          fieldErrors: expect.objectContaining({
            id: ['Expected number, received string'],
            whatsapp: ['String must contain exactly 11 character(s)'],
          }),
        })
      )
    }
  });
});
