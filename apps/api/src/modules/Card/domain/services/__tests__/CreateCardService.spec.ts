import 'reflect-metadata';

import { CreateCardService } from '../CreateCardService';
import { ICardsRepository } from '../../repositories/ICardsRepository';
import { Card } from '../../models/Card';
import AppError from '@shared/errors/AppError';

const fakeUUID = 'e49de73f-f560-4c40-8542-06f78f1a542d';
const cardRepositoryMocked = {
  findByName: jest.fn(),
  create: jest
    .fn()
    .mockResolvedValue(
      new Card({ id: 'fake-uuid', name: 'fake-card-name', user_id: fakeUUID }, false),
    ),
};
const createCardService = new CreateCardService(
  cardRepositoryMocked as unknown as ICardsRepository,
);

describe('CreateCardService use case - Unit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be able to create a new card', async () => {
    const cardServiceOutput = await createCardService.execute({
      due_day: 10,
      flag: 'visa',
      turning_day: 6,
      name: 'fake-card-name',
      user_id: fakeUUID,
    });

    expect(cardServiceOutput).toHaveProperty('id');
  });

  it('should not be able to create two cards with same name', async () => {
    cardRepositoryMocked.findByName.mockResolvedValueOnce(true);

    await expect(
      createCardService.execute({
        due_day: 10,
        flag: 'mastercard',
        turning_day: 6,
        name: 'fake-card-name',
        user_id: fakeUUID,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
