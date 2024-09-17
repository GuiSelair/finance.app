import { v4 } from 'uuid';

import { Card } from '../Card';
import { ZodError } from 'zod';

describe('Card model - Unit test', () => {
  it('should be able to create a card object with validate as true', async () => {
    const cardOutput = new Card(
      {
        id: v4(),
        name: 'fake-card-name',
        turning_day: 20,
        due_day: 5,
        user_id: v4(),
        flag: 'mastercard',
      },
      true,
    );

    expect(cardOutput).toBeInstanceOf(Card);
  });

  it('should be able to create a card object with validate as partial', async () => {
    const cardOutput = new Card(
      {
        id: v4(),
        name: 'fake-card-name',
      },
      'partial',
    );

    expect(cardOutput).toBeInstanceOf(Card);
  });

  it('should be able to create a card object with validate as create', async () => {
    const cardOutput = new Card(
      {
        name: 'fake-card-name',
        turning_day: 20,
        due_day: 5,
        user_id: v4(),
        flag: 'mastercard',
      },
      'create',
    );

    expect(cardOutput).toBeInstanceOf(Card);
  });

  it('should be able to create a card object with validate as false', async () => {
    const cardOutput = new Card({}, false);

    expect(cardOutput).toBeInstanceOf(Card);
  });

  it('should not be able to create a card object with invalid params', async () => {
    try {
      new Card({
        id: v4(),
        name: 'fake-card-name',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
