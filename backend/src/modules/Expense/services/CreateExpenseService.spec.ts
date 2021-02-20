import 'reflect-metadata';

import CreateExpenseService from './CreateExpenseService';
import FakeExpensesRepository from '../repositories/fakes/FakeExpensesRepository';
import CreateCardService from '../../Card/services/CreateCardService';
import FakeCardRepository from '../../Card/repositories/fakes/FakeCardRepository';
import CreateUserService from '../../User/services/CreateUserService';
import FakeHashProvider from '../../User/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../User/repositories/fakes/FakeUsersRepository';

let createCardService: CreateCardService;
let fakeCardRepository: FakeCardRepository;
let createUserService: CreateUserService;
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeExpensesRepository: FakeExpensesRepository;
let createExpenseService: CreateExpenseService;

describe('CreateCard', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    fakeCardRepository = new FakeCardRepository();
    createCardService = new CreateCardService(fakeCardRepository);

    fakeExpensesRepository = new FakeExpensesRepository();
    createExpenseService = new CreateExpenseService(fakeExpensesRepository);
  });

  it('should be able to create expense without split expense', async () => {
    const user = await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    });

    const card = await createCardService.execute({
      due_day: 10,
      flag: 'MASTERCARD',
      name: 'Nubank',
      user_id: user.id,
    });

    const expense = await createExpenseService.execute({
      name: 'Férias',
      description: 'Férias de Verão',
      amount: 1200,
      split_expense: false,
      parcel: 1,
      user_id: user.id,
      card_id: card.id,
    });

    expect(expense).toHaveProperty('id');
  });

  it('should be able to create expense with split expense', async () => {
    const user = await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    });

    const card = await createCardService.execute({
      due_day: 10,
      flag: 'MASTERCARD',
      name: 'Nubank',
      user_id: user.id,
    });

    const expense = await createExpenseService.execute({
      name: 'Férias',
      description: 'Férias de Verão',
      amount: 1200,
      split_expense: true,
      share_with: ['Daniela', 'Pai'],
      percentage_of_each: ['20%', '21%'],
      parcel: 1,
      user_id: user.id,
      card_id: card.id,
    });

    expect(expense).toHaveProperty('id');
    console.log(expense);
  });
});
