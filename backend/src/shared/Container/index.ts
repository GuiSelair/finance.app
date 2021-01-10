import { container } from 'tsyringe';

import '../../modules/User/providers';

import IUsersRepository from '../../modules/User/repositories/IUsersRepository';
import UsersRepository from '../../modules/User/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
