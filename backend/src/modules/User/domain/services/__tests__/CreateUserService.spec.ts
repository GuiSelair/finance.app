import 'reflect-metadata';

import { CreateUserService } from '../CreateUserService';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../../../shared/providers/HashProvider/fakes/FakeHashProvider';

let createUserService: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able create a new user', async () => {
    const user = await createUserService.execute({
      email: 'joeDoe@email.com',
      name: 'Jonh Doe',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });
});
