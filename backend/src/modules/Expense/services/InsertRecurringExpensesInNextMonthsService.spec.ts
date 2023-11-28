
import 'reflect-metadata';

import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository'
import IExpensesRepository from '../repositories/IExpensesRepository'
import FakeExpensesInMonthRepository from '../repositories/fakes/FakeExpensesInMonthRepository';
import FakeExpensesRepository from '../repositories/fakes/FakeExpensesRepository';

import { InsertRecurringExpensesInNextMonthsService } from './InsertRecurringExpensesInNextMonthsService'

describe('InsertRecurringExpensesInNextMonthsService - Unit Test', () => {
  const expensesInMonthRepository = new FakeExpensesInMonthRepository();
  const expensesRepository = new FakeExpensesRepository();
  const insertRecurringExpensesInNextMonthsService = new InsertRecurringExpensesInNextMonthsService(
    expensesRepository,
    expensesInMonthRepository,
  );

  it('should be able to insert recurring expenses in next month', async () => {})
})
