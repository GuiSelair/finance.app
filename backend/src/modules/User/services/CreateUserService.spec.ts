import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let createUserService: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
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
