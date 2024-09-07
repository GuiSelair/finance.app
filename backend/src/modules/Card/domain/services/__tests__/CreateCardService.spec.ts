import 'reflect-metadata';

import CreateCardService from '../CreateCardService';
import FakeCardRepository from '../../repositories/fakes/FakeCardRepository';

import CreateUserService from '../../User/services/CreateUserService';
import FakeUserRepository from '../../User/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../User/providers/HashProvider/fakes/FakeHashProvider';

let createCardService: CreateCardService;
let fakeCardRepository: FakeCardRepository;
let createUserService: CreateUserService;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateCard', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    fakeCardRepository = new FakeCardRepository();
    createCardService = new CreateCardService(fakeCardRepository);
  });

  it('should be able to create card', async () => {
    const user = await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    });

    const card = await createCardService.execute({
      due_day: 10,
      flag: 'MASTERCARD',
      turning_day: 6,
      name: 'Nubank',
      user_id: user.id,
    });

    expect(card).toHaveProperty('id');
  });
  // it('should not be able to create card without name');
  // it('should not be able to create card without flag');
  // it('should not be able to create card without due date');
  // it('should not be able to create two cards with same name');
});
