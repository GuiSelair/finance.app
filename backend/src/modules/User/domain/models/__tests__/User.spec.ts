import { v4 } from 'uuid';

import { User } from '../User';
import { ZodError } from 'zod';

describe('User model - Unit test', () => {
  it('should be able to create a user object with validate as true', async () => {
    const userOutput = new User(
      {
        id: v4(),
        name: 'fake-card-name',
        email: 'test@test.com',
        password: 'fake-user-password',
      },
      true,
    );

    expect(userOutput).toBeInstanceOf(User);
  });

  it('should be able to create a user object with validate as partial', async () => {
    const userOutput = new User(
      {
        id: v4(),
        name: 'fake-card-name',
      },
      'partial',
    );

    expect(userOutput).toBeInstanceOf(User);
  });

  it('should be able to create a user object with validate as create', async () => {
    const userOutput = new User(
      {
        name: 'fake-card-name',
        email: 'test@test.com',
        password: 'fake-user-password',
      },
      'create',
    );

    expect(userOutput).toBeInstanceOf(User);
  });

  it('should be able to create a expense object with validate as false', async () => {
    const userOutput = new User({}, false);

    expect(userOutput).toBeInstanceOf(User);
  });

  it('should not be able to create a card object with invalid params', async () => {
    try {
      new User({
        id: v4(),
        name: 'fake-card-name',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});
