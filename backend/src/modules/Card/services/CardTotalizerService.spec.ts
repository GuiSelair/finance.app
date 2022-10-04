import 'reflect-metadata';

import CardTotalizerService from './CardTotalizerService';
import FakeCardRepository from '../repositories/fakes/FakeCardRepository';
import FakeExpenseInMonthRepository from '../../Expense/repositories/fakes/FakeExpensesInMonthRepository';

describe('CardTotalizerService - Unit Test', () => {
  const cardRepository = new FakeCardRepository();
  const expenseInMonthRepository = new FakeExpenseInMonthRepository();

  const cardTotalizerService = new CardTotalizerService(
    cardRepository,
    expenseInMonthRepository,
  );

  beforeAll(() => {
    cardRepository.create({
      user_id: 'fake-user-id',
      due_day: 13,
      turning_day: 6,
      flag: 'Any-flag',
      name: 'Any-name',
    });
    const fakeExpensesInMonthToCreate = [
      {
        expense_id: 'fake-expense-id1',
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: 200,
        month: 12,
        year: 2022,
      },
      {
        expense_id: 'fake-expense-id2',
        number_current_of_parcel: 1,
        number_total_of_parcel: 3,
        value_of_parcel: 37.62,
        month: 12,
        year: 2022,
      },
      {
        expense_id: 'fake-expense-id3',
        number_current_of_parcel: 1,
        number_total_of_parcel: 3,
        value_of_parcel: 37.62,
        month: 11,
        year: 2022,
      },
    ];

    expenseInMonthRepository.create(fakeExpensesInMonthToCreate);
  });

  it('should be able to list all card totalizers', async () => {
    const totalizers = await cardTotalizerService.execute({
      month: 12,
      year: 2022,
      userId: 'fake-user-id',
    });
    console.log(totalizers);
    expect(totalizers).toBeInstanceOf(Array);
  });
});
