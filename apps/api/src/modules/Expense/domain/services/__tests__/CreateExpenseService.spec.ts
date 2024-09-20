import 'reflect-metadata';
import { v4 } from 'uuid';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { CreateExpenseMonthService } from '../CreateExpenseMonthService';
import { IExpensesRepository } from '../../repositories/IExpensesRepository';
import { CreateExpenseService } from '../CreateExpenseService';

const expensesRepositoryMocked = {
  create: jest.fn().mockResolvedValue({
    id: v4(),
    name: 'fake-expense-name',
    amount: 1200,
    parcel: 1,
    user_id: v4(),
    card_id: v4(),
    purchase_date: '2024-09-17',
    is_recurring: false,
  }),
  remove: jest.fn(),
};
const cardsRepositoryMocked = {
  findById: jest.fn().mockResolvedValue({ turning_day: 25 }),
};
const createExpenseService = new CreateExpenseService(
  expensesRepositoryMocked as unknown as IExpensesRepository,
  cardsRepositoryMocked as unknown as ICardsRepository,
);

describe('CreateExpenseService use case - Unit test', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    container.clearInstances();
    container.registerInstance('ExpensesMonthRepository', expensesRepositoryMocked);
    container.registerInstance('CardsRepository', cardsRepositoryMocked);
  });

  it('should be able to create expense', async () => {
    const createExpenseServiceResponse = await createExpenseService.execute({
      name: 'fake-expense-name',
      amount: 1200,
      parcel: 1,
      user_id: v4(),
      card_id: v4(),
      purchase_date: '2024-09-17',
    });

    expect(createExpenseServiceResponse).toHaveProperty('id');
    expect(expensesRepositoryMocked.create).toHaveBeenCalled();
  });

  it('should not be able to create expense that not are linked to card', async () => {
    cardsRepositoryMocked.findById.mockResolvedValueOnce(null);
    await expect(
      createExpenseService.execute({
        name: 'fake-expense-name',
        amount: 1200,
        parcel: 1,
        user_id: v4(),
        card_id: v4(),
        purchase_date: '2024-09-17',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to remove expense if expenses month create is failed', async () => {
    jest.spyOn(CreateExpenseMonthService.prototype, 'execute').mockRejectedValueOnce('fake-error');
    await expect(
      createExpenseService.execute({
        name: 'fake-expense-name',
        amount: 1200,
        parcel: 1,
        user_id: v4(),
        card_id: v4(),
        purchase_date: '2024-09-17',
      }),
    ).rejects.toBeInstanceOf(AppError);
    expect(expensesRepositoryMocked.remove).toHaveBeenCalledWith(expect.any(String));
  });
});
