import 'reflect-metadata';

import { ICardsRepository } from '../../repositories/ICardsRepository';
import { FetchCardsService } from '../FetchCardService';
import { CardFlags } from '../../models/Card';

const fakeUUID = '56a64134-c3bc-4ded-9ac5-a89d265a665d';
const cardsRepositoryMocked = {
  fetch: jest.fn().mockResolvedValue([
    {
      id: fakeUUID,
      name: 'fake-card-name-1',
      due_day: 5,
      flag: CardFlags.MASTERCARD,
      user_id: fakeUUID,
      turning_day: 30,
    },
    {
      id: fakeUUID,
      name: 'fake-card-name-2',
      due_day: 8,
      flag: CardFlags.MASTERCARD,
      user_id: fakeUUID,
      turning_day: 30,
    },
  ]),
};
const fetchCardsService = new FetchCardsService(
  cardsRepositoryMocked as unknown as ICardsRepository,
);

describe('FetchCardService use case - Unit test', () => {
  it('should be able to fetch cards', async () => {
    const fetchCardsServiceOutput = await fetchCardsService.execute({ user_id: 'fake-user-id' });
    expect(fetchCardsServiceOutput.cards).toEqual([
      expect.objectContaining({
        id: fakeUUID,
        name: 'fake-card-name-1',
        due_day: 5,
        flag: CardFlags.MASTERCARD,
        user_id: fakeUUID,
        turning_day: 30,
      }),
      expect.objectContaining({
        id: fakeUUID,
        name: 'fake-card-name-2',
        due_day: 8,
        flag: CardFlags.MASTERCARD,
        user_id: fakeUUID,
        turning_day: 30,
      }),
    ]);
  });
});
