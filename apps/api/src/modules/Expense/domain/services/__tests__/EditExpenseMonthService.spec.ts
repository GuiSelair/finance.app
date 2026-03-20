import 'reflect-metadata';

import { randomUUID } from 'node:crypto';

import { IExpensesRepository } from '../../repositories/IExpensesRepository';
import { IExpensesMonthRepository } from '../../repositories/IExpensesMonthRepository';
import { EditExpenseMonthService } from '../EditExpenseMonthService';
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import AppError from '@shared/errors/AppError';
import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';

const expensesMonthRepositoryMocked = {
  findById: jest.fn().mockResolvedValue({
    id: 'fake-expense-month-id',
    expense: {
      id: 'fake-expense-id',
      name: 'fake-expense-name',
      description: 'fake-description',
      amount: 10,
      user_id: 'fake-user-id',
      card_id: 'fake-card-id',
      parcel: 1,
      is_recurring: false,
    },
    is_paid: false,
    value_of_parcel: 10,
    expense_id: 'fake-expense-id',
    year: 2025,
    month: 0,
  } as ExpenseMonthMapper),
  update: jest.fn(),
} as Partial<IExpensesMonthRepository>;
const expensesRepositoryMocked = {
  edit: jest.fn(),
  update: jest.fn(),
};
const cardsRepositoryMocked = {
  findById: jest.fn().mockResolvedValue({ id: 'fake-card-id' }),
};
const updateFutureRecurringExpenseMonthsServiceMocked = {
  execute: jest.fn().mockResolvedValue(undefined),
};

const editExpenseMonthService = new EditExpenseMonthService(
  expensesRepositoryMocked as unknown as IExpensesRepository,
  expensesMonthRepositoryMocked as unknown as IExpensesMonthRepository,
  cardsRepositoryMocked as unknown as ICardsRepository,
  updateFutureRecurringExpenseMonthsServiceMocked as never,
);

function mockTransactionWithManager(saveMock: jest.Mock) {
  const managerMock = {
    getRepository: jest.fn().mockReturnValue({ save: saveMock }),
  };
  jest
    .spyOn(DataSourceConfiguration.manager, 'transaction')
    .mockImplementation(async (...args: unknown[]) => {
      const cb = args.length === 2 ? args[1] : args[0];
      return typeof cb === 'function'
        ? (cb as (m: unknown) => Promise<unknown>)(managerMock)
        : undefined;
    });
  return { managerMock, saveMock };
}

describe('EditExpenseMonthService use case - Unit test', () => {
  it('should be able to edit expense month via transaction', async () => {
    const saveMock = jest.fn().mockResolvedValue(undefined);
    mockTransactionWithManager(saveMock);

    const fakeExpenseMonthUuid = randomUUID();
    const fakeCardUuid = randomUUID();
    const valuesToChange = {
      is_paid: true,
      name: 'fake-expense-name-changed',
      description: 'fake-description-changed',
      value_of_parcel: 20,
      card_id: fakeCardUuid,
    };

    await editExpenseMonthService.execute({
      id: fakeExpenseMonthUuid,
      user_id: randomUUID(),
      valuesToChange,
    });

    expect(saveMock).toHaveBeenCalledTimes(2);
    expect(saveMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'fake-expense-name-changed',
        description: 'fake-description-changed',
        card_id: fakeCardUuid,
        amount: 20,
      }),
    );
    expect(saveMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        is_paid: true,
        value_of_parcel: 20,
      }),
    );
    expect(expensesRepositoryMocked.update).not.toHaveBeenCalled();
    expect(expensesMonthRepositoryMocked.update).not.toHaveBeenCalled();
  });

  it('should not be able update card id to unexistable card', async () => {
    cardsRepositoryMocked.findById.mockResolvedValueOnce(null);
    const fakeExpenseMonthUuid = randomUUID();
    const fakeCardUuid = randomUUID();
    const valuesToChange = {
      is_paid: true,
      name: 'fake-expense-name-changed',
      description: 'fake-description-changed',
      value_of_parcel: 20,
      card_id: fakeCardUuid,
    };

    await expect(
      editExpenseMonthService.execute({
        id: fakeExpenseMonthUuid,
        user_id: randomUUID(),
        valuesToChange,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw AppError and not update when amount is sent for parceled expense', async () => {
    jest.clearAllMocks();
    const parceledExpenseMonth = {
      id: 'fake-expense-month-id',
      expense: {
        id: 'fake-expense-id',
        name: 'fake-expense-name',
        description: 'fake-description',
        amount: 10,
        user_id: 'fake-user-id',
        card_id: 'fake-card-id',
        parcel: 2,
        is_recurring: false,
      },
      is_paid: false,
      value_of_parcel: 10,
      expense_id: 'fake-expense-id',
      year: 2025,
      month: 0,
    } as ExpenseMonthMapper;
    (expensesMonthRepositoryMocked.findById as jest.Mock).mockResolvedValueOnce(
      parceledExpenseMonth,
    );

    const id = randomUUID();
    const user_id = randomUUID();

    await expect(
      editExpenseMonthService.execute({
        id,
        user_id,
        valuesToChange: { amount: 200 },
      }),
    ).rejects.toMatchObject({
      message: expect.stringContaining('installment'),
      statusCode: 400,
    });

    expect(expensesRepositoryMocked.update).not.toHaveBeenCalled();
    expect(expensesMonthRepositoryMocked.update).not.toHaveBeenCalled();
  });

  it('should call revalidation service and not use repository update when fixed expense amount is changed', async () => {
    jest.clearAllMocks();
    const saveMock = jest.fn().mockResolvedValue(undefined);
    const { managerMock } = mockTransactionWithManager(saveMock);

    const recurringExpenseMonth = {
      id: 'fake-expense-month-id',
      expense: {
        id: 'fake-expense-id',
        name: 'fake-expense-name',
        description: 'fake-description',
        amount: 10,
        user_id: 'fake-user-id',
        card_id: 'fake-card-id',
        parcel: 1,
        is_recurring: true,
      },
      is_paid: false,
      value_of_parcel: 10,
      expense_id: 'fake-expense-id',
      year: 2025,
      month: 0,
    } as ExpenseMonthMapper;
    (expensesMonthRepositoryMocked.findById as jest.Mock).mockResolvedValueOnce(
      recurringExpenseMonth,
    );

    const id = randomUUID();
    const user_id = randomUUID();

    await editExpenseMonthService.execute({
      id,
      user_id,
      valuesToChange: { amount: 150 },
    });

    expect(updateFutureRecurringExpenseMonthsServiceMocked.execute).toHaveBeenCalledTimes(1);
    expect(updateFutureRecurringExpenseMonthsServiceMocked.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        expense_id: 'fake-expense-id',
        reference_year: 2025,
        reference_month: 0,
        new_amount: 150,
        manager: managerMock,
      }),
    );
    expect(expensesRepositoryMocked.update).not.toHaveBeenCalled();
    expect(expensesMonthRepositoryMocked.update).not.toHaveBeenCalled();
  });

  it('should not call revalidation when expense is not recurring and amount is sent', async () => {
    jest.clearAllMocks();
    const saveMock = jest.fn().mockResolvedValue(undefined);
    mockTransactionWithManager(saveMock);

    const id = randomUUID();
    const user_id = randomUUID();

    await editExpenseMonthService.execute({
      id,
      user_id,
      valuesToChange: { amount: 100 },
    });

    expect(updateFutureRecurringExpenseMonthsServiceMocked.execute).not.toHaveBeenCalled();
    expect(expensesRepositoryMocked.update).not.toHaveBeenCalled();
    expect(saveMock).toHaveBeenCalledTimes(2);
  });
});
