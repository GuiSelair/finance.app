import { container } from 'tsyringe';

/** Repositories register */
import type { IUsersRepository } from '@modules/User/domain/repositories/IUsersRepository';
import { UsersRepository } from '@modules/User/infra/typeorm/repositories/UsersRepository';

import type { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { CardsRepository } from '@modules/Card/infra/typeorm/repositories/CardsRepository';

import type { IExpensesRepository } from '@modules/Expense/domain/repositories/IExpensesRepository';
import { ExpensesRepository } from '@modules/Expense/infra/typeorm/repositories/ExpensesRepository';

import type { IExpensesMonthRepository } from '@modules/Expense/domain/repositories/IExpensesInMonthRepository';
import { ExpensesMonthRepository } from '@modules/Expense/infra/typeorm/repositories/ExpensesMonthRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ICardsRepository>('CardsRepository', CardsRepository);
container.registerSingleton<IExpensesRepository>('ExpensesRepository', ExpensesRepository);
container.registerSingleton<IExpensesMonthRepository>(
  'ExpensesMonthRepository',
  ExpensesMonthRepository,
);

/** Providers register */
import type { IHashProvider } from '@shared/providers/HashProvider/interfaces/IHashProvider';
import { BCryptProvider } from '@providers/HashProvider/implementations/BCryptProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
