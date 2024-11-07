import 'reflect-metadata';

import { CardSummaryService } from '../CardSummaryService';
import { Card } from '../../models/Card';
import { ICardsRepository } from '../../repositories/ICardsRepository';
import { IExpensesMonthRepository } from '@modules/Expense/domain/repositories/IExpensesInMonthRepository';
import { ExpenseMonth } from '@modules/Expense/domain/models/ExpenseMonth';
import { Expense } from '@modules/Expense/domain/models/Expense';

const fakeCardIdOne = 'e49de73f-f560-4c40-8542-06f78f1a542d';
const fakeCardIdTwo = '86ffb37d-f40a-4349-b0bd-ef2702e6250f';
const anotherFakeUUID = '56a64134-c3bc-4ded-9ac5-a89d265a665d';

const mockExpensesMonth = [
  new ExpenseMonth(
    {
      id: anotherFakeUUID,
      expense_id: anotherFakeUUID,
      expense: new Expense({ card_id: fakeCardIdOne }, false),
      number_current_of_parcel: 1,
      number_total_of_parcel: 1,
      value_of_parcel: 200,
      month: 11,
      year: 2022,
    },
    false,
  ),
  new ExpenseMonth(
    {
      id: anotherFakeUUID,
      expense_id: anotherFakeUUID,
      expense: new Expense({ card_id: fakeCardIdOne }, false),
      number_current_of_parcel: 1,
      number_total_of_parcel: 3,
      value_of_parcel: 37.62,
      month: 11,
      year: 2022,
    },
    false,
  ),
  new ExpenseMonth(
    {
      id: anotherFakeUUID,
      expense_id: anotherFakeUUID,
      expense: new Expense({ card_id: fakeCardIdTwo }, false),
      number_current_of_parcel: 1,
      number_total_of_parcel: 3,
      value_of_parcel: 37.62,
      month: 10,
      year: 2022,
    },
    false,
  ),
] as ExpenseMonth;

const cardsRepositoryMocked = {
  fetch: jest
    .fn()
    .mockResolvedValue([
      new Card({ id: fakeCardIdOne, name: 'fake-card-name-1' }, false),
      new Card({ id: fakeCardIdTwo, name: 'fake-card-name-2' }, false),
    ]),
};
const expenseMonthRepositoryMocked = {
  fetchByMonthAndYear: jest.fn().mockResolvedValue(mockExpensesMonth),
};
const cardSummaryService = new CardSummaryService(
  expenseMonthRepositoryMocked as unknown as IExpensesMonthRepository,
  cardsRepositoryMocked as unknown as ICardsRepository,
);

describe('CardSummaryService use case - Unit Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to list all card summary', async () => {
    const cardSummaryServiceOutput = await cardSummaryService.execute({
      month: 11,
      year: 2022,
      user_id: 'fake-user-id',
    });

    expect(cardSummaryServiceOutput).toEqual([
      expect.objectContaining({
        id: fakeCardIdOne,
        name: 'fake-card-name-1',
        total: 237.62,
      }),
      expect.objectContaining({
        id: fakeCardIdTwo,
        name: 'fake-card-name-2',
        total: 37.62,
      }),
    ]);
  });

  it('should be able to return card summary list with zero if not exists expenses in month', async () => {
    expenseMonthRepositoryMocked.fetchByMonthAndYear.mockResolvedValueOnce([]);

    const cardSummaryServiceOutput = await cardSummaryService.execute({
      month: 11,
      year: 2022,
      user_id: 'fake-user-id',
    });

    expect(cardSummaryServiceOutput).toEqual([
      expect.objectContaining({
        id: fakeCardIdOne,
        name: 'fake-card-name-1',
        total: 0,
      }),
      expect.objectContaining({
        id: fakeCardIdTwo,
        name: 'fake-card-name-2',
        total: 0,
      }),
    ]);
  });

  it('should be able to return an empty list if not exists cards', async () => {
    cardsRepositoryMocked.fetch.mockResolvedValueOnce([]);

    const cardSummaryServiceOutput = await cardSummaryService.execute({
      month: 11,
      year: 2022,
      user_id: 'fake-user-id',
    });

    expect(cardSummaryServiceOutput).toEqual([]);
  });
});
