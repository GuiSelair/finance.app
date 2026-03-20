import { randomUUID } from 'node:crypto';

import { IExpensesMonthRepository } from '../../repositories/IExpensesMonthRepository';
import { UpdateFutureRecurringExpenseMonthsService } from '../UpdateFutureRecurringExpenseMonthsService';
import { ExpenseMonthMapper } from '@modules/Expense/infra/typeorm/entities/ExpenseMonthMapper';

const expenseId = randomUUID();
const makeRecord = (id: string, month: number, year: number): Partial<ExpenseMonthMapper> => ({
  id,
  expense_id: expenseId,
  year,
  month,
  value_of_parcel: 100,
});

const expensesMonthRepositoryMock = {
  fetchByExpenseId: jest.fn(),
  update: jest.fn().mockResolvedValue(undefined),
} as Partial<IExpensesMonthRepository>;

const service = new UpdateFutureRecurringExpenseMonthsService(
  expensesMonthRepositoryMock as IExpensesMonthRepository,
);

describe('UpdateFutureRecurringExpenseMonthsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update only future months relative to reference', async () => {
    const jan = makeRecord(randomUUID(), 0, 2025);
    const fev = makeRecord(randomUUID(), 1, 2025);
    const mar = makeRecord(randomUUID(), 2, 2025);
    const records = [jan, fev, mar] as ExpenseMonthMapper[];
    (expensesMonthRepositoryMock.fetchByExpenseId as jest.Mock).mockResolvedValue([records, 3]);

    await service.execute({
      expense_id: expenseId,
      reference_year: 2025,
      reference_month: 0,
      new_amount: 200,
    });

    expect(expensesMonthRepositoryMock.fetchByExpenseId).toHaveBeenCalledWith({
      expense_id: expenseId,
    });
    expect(expensesMonthRepositoryMock.update).toHaveBeenCalledTimes(2);
    expect(expensesMonthRepositoryMock.update).toHaveBeenCalledWith({
      id: fev.id,
      data: { value_of_parcel: 200 },
    });
    expect(expensesMonthRepositoryMock.update).toHaveBeenCalledWith({
      id: mar.id,
      data: { value_of_parcel: 200 },
    });
  });

  it('should not call update when there are no future records', async () => {
    const jan = makeRecord(randomUUID(), 0, 2025);
    const records = [jan] as ExpenseMonthMapper[];
    (expensesMonthRepositoryMock.fetchByExpenseId as jest.Mock).mockResolvedValue([records, 1]);

    await service.execute({
      expense_id: expenseId,
      reference_year: 2025,
      reference_month: 0,
      new_amount: 200,
    });

    expect(expensesMonthRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should not call update when list is empty and not throw', async () => {
    (expensesMonthRepositoryMock.fetchByExpenseId as jest.Mock).mockResolvedValue([[], 0]);

    await expect(
      service.execute({
        expense_id: expenseId,
        reference_year: 2025,
        reference_month: 0,
        new_amount: 200,
      }),
    ).resolves.not.toThrow();

    expect(expensesMonthRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should use manager repository when manager is passed and not call fetchByExpenseId', async () => {
    const fev = makeRecord(randomUUID(), 1, 2025) as ExpenseMonthMapper;
    const findMock = jest.fn().mockResolvedValue([fev]);
    const saveMock = jest.fn().mockResolvedValue(undefined);
    const managerMock = {
      getRepository: jest.fn().mockReturnValue({
        find: findMock,
        save: saveMock,
      }),
    };

    await service.execute({
      expense_id: expenseId,
      reference_year: 2025,
      reference_month: 0,
      new_amount: 200,
      manager: managerMock as never,
    });

    expect(expensesMonthRepositoryMock.fetchByExpenseId).not.toHaveBeenCalled();
    expect(managerMock.getRepository).toHaveBeenCalledWith(ExpenseMonthMapper);
    expect(findMock).toHaveBeenCalledWith({ where: { expense_id: expenseId } });
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(saveMock).toHaveBeenCalledWith({ ...fev, value_of_parcel: 200 });
  });
});
