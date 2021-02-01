import { container } from 'tsyringe';

import '../../modules/User/providers';

import IUsersRepository from '../../modules/User/repositories/IUsersRepository';
import UsersRepository from '../../modules/User/infra/typeorm/repositories/UsersRepository';

import ICardRepository from '../../modules/Card/repositories/ICardRepository';
import CardRepository from '../../modules/Card/infra/typeorm/repositories/CardRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICardRepository>('CardRepository', CardRepository);
