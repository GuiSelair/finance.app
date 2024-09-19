import 'reflect-metadata';

import { User } from '@modules/User/domain/models/User';
import { IUsersRepository } from '@modules/User/domain/repositories/IUsersRepository';
import { IHashProvider } from '@shared/providers/HashProvider/interfaces/IHashProvider';
import AppError from '@errors/AppError';
import { SignInService } from '../SignInService';
import { rejects } from 'assert';

const mockUserData = new User(
  { id: 'fake-uuid', name: 'fake-name', email: 'fake-email@email.com', password: 'fake-password' },
  false,
);
const userRepositoryMocked = {
  findByEmail: jest.fn().mockResolvedValue(mockUserData),
};
const hashProviderMocked = {
  compareHash: jest.fn().mockReturnValue(true),
};
const signInServiceMocked = new SignInService(
  userRepositoryMocked as unknown as IUsersRepository,
  hashProviderMocked as unknown as IHashProvider,
);

describe('SignInService use case - Unit Test', () => {
  process.env.JWT_SECRET = 'fake-jwt-secret';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to sign in user', async () => {
    const signInServiceOutput = await signInServiceMocked.execute({
      email: 'fake-email@email.com',
      password: 'fake-password',
    });

    expect(signInServiceOutput).toHaveProperty('token');
    expect(userRepositoryMocked.findByEmail).toHaveBeenCalledWith('fake-email@email.com');
    expect(hashProviderMocked.compareHash).toHaveBeenCalledWith('fake-password', 'fake-password');
  });

  it('should not be able to sign in user if user not exists', async () => {
    userRepositoryMocked.findByEmail.mockResolvedValueOnce(null);

    await expect(
      signInServiceMocked.execute({
        email: 'fake-email-no-exists@email.com',
        password: 'fake-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(userRepositoryMocked.findByEmail).toHaveBeenCalledWith('fake-email-no-exists@email.com');
    expect(hashProviderMocked.compareHash).not.toHaveBeenCalled();
  });

  it('should not be able to sign in user if password not same', async () => {
    hashProviderMocked.compareHash.mockReturnValueOnce(false);

    await expect(
      signInServiceMocked.execute({
        email: 'fake-email@email.com',
        password: 'fake-password-no-same',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(userRepositoryMocked.findByEmail).toHaveBeenCalled();
    expect(hashProviderMocked.compareHash).toHaveBeenCalledWith(
      'fake-password-no-same',
      'fake-password',
    );
  });

  it('should not be able to sign in user if secret environment is not found', async () => {
    process.env.JWT_SECRET = '';
    await expect(
      signInServiceMocked.execute({
        email: 'fake-email@email.com',
        password: 'fake-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(userRepositoryMocked.findByEmail).toHaveBeenCalled();
    expect(hashProviderMocked.compareHash).toHaveBeenCalled();
  });
});
