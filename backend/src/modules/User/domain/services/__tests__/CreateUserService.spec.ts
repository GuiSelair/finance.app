import 'reflect-metadata';

import { CreateUserService } from '../CreateUserService';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IHashProvider } from '@shared/providers/HashProvider/interfaces/IHashProvider';
import { User } from '../../models/User';
import AppError from '@shared/errors/AppError';

const usersRepositoryMocked = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};
const hashProviderMocked = {
  generateHash: jest.fn().mockResolvedValue('fake-hashed-password'),
};
const createUserService = new CreateUserService(
  usersRepositoryMocked as unknown as IUsersRepository,
  hashProviderMocked as unknown as IHashProvider,
);

describe('CreateUserService use case - Unit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able create a new user', async () => {
    await createUserService.execute({
      email: 'joeDoe@email.com',
      name: 'Jonh Doe',
      password: '123',
    });

    expect(usersRepositoryMocked.create).toHaveBeenCalledWith(
      new User(
        {
          email: 'joeDoe@email.com',
          name: 'Jonh Doe',
          password: 'fake-hashed-password',
        },
        'create',
      ),
    );
  });

  it('should not be able create a new user if user already exists', async () => {
    usersRepositoryMocked.findByEmail.mockResolvedValueOnce(true);
    await expect(
      createUserService.execute({
        email: 'joeDoe@email.com',
        name: 'Jonh Doe',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
