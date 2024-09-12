import { container } from 'tsyringe';

import '@shared/providers';

import { IUsersRepository } from '@modules/User/domain/repositories/IUsersRepository';
import { UsersRepository } from '@modules/User/infra/typeorm/repositories/UsersRepository';

import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { CardsRepository } from '@modules/Card/infra/typeorm/repositories/CardsRepository';

import { IExpensesRepository } from '@modules/Expense/domain/repositories/IExpensesRepository';
import { ExpensesRepository } from '@modules/Expense/infra/typeorm/repositories/ExpensesRepository';

import { IExpensesMonthRepository } from '@modules/Expense/domain/repositories/IExpensesInMonthRepository';
import { ExpensesMonthRepository } from '@modules/Expense/infra/typeorm/repositories/ExpensesMonthRepository';

/** Repositories register */
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<ICardsRepository>('CardsRepository', CardsRepository);
container.registerSingleton<IExpensesRepository>('ExpensesRepository', ExpensesRepository);
container.registerSingleton<IExpensesMonthRepository>(
  'ExpensesMonthRepository',
  ExpensesMonthRepository,
);
