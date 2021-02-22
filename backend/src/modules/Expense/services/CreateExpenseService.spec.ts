import 'reflect-metadata';

import CreateExpenseService from './CreateExpenseService';
import FakeExpensesRepository from '../repositories/fakes/FakeExpensesRepository';
import CreateCardService from '../../Card/services/CreateCardService';
import FakeCardRepository from '../../Card/repositories/fakes/FakeCardRepository';
import CreateUserService from '../../User/services/CreateUserService';
import FakeHashProvider from '../../User/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../../User/repositories/fakes/FakeUsersRepository';
import User from '../../User/infra/typeorm/entities/User';
import Card from '../../Card/infra/typeorm/entities/Card';

let createCardService: CreateCardService;
let fakeCardRepository: FakeCardRepository;
let createUserService: CreateUserService;
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeExpensesRepository: FakeExpensesRepository;
let createExpenseService: CreateExpenseService;

let user: User;
let card: Card;

describe('CreateCard', () => {
  beforeEach(async () => {
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

    user = await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: '123',
    });

    card = await createCardService.execute({
      due_day: 10,
      flag: 'MASTERCARD',
      name: 'Nubank',
      user_id: user.id,
    });
  });

  it('should be able to create expense that are not divided', async () => {
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

  it('should be able to create expense that are divided', async () => {
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
  });

  it('should be able to create expense that are not linked to any card', async () => {
    const expense = await createExpenseService.execute({
      name: 'Férias',
      description: 'Férias de Verão',
      amount: 1200,
      split_expense: false,
      parcel: 1,
      user_id: user.id,
      due_date: new Date(2021, 4, 10),
    });

    expect(expense).toHaveProperty('id');
  });
});
