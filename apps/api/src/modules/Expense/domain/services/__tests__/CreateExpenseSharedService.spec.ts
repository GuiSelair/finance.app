import 'reflect-metadata';
import { v4 as uuid } from 'uuid';

import AppError from '@shared/errors/AppError';
import { IShareExpensesPersonRepository } from '@modules/ShareExpensePerson/domain/repositories/IShareExpensesPersonRepository';
import { ExpenseMonth } from '@modules/Expense/domain/models/ExpenseMonth';
import { ExpenseShared } from '@modules/Expense/domain/models/ExpenseShared';
import { IExpensesSharedRepository } from '../../repositories/IExpensesSharedRepository';
import { CreateExpenseSharedService } from '../CreateExpenseSharedService';

describe('CreateExpenseSharedService - Unit test', () => {
  let expenseSharedRepositoryMock: Partial<IExpensesSharedRepository>;
  let shareExpensesPersonRepositoryMock: Partial<IShareExpensesPersonRepository>;
  let sut: CreateExpenseSharedService;

  const userId = uuid();
  const expenseId = uuid();
  const expenseMonths: ExpenseMonth[] = [
    new ExpenseMonth(
      {
        id: uuid(),
        expense_id: expenseId,
        number_current_of_parcel: 1,
        number_total_of_parcel: 2,
        value_of_parcel: 100,
        month: 1,
        year: 2024,
        is_paid: false,
      },
      'partial',
    ),
    new ExpenseMonth(
      {
        id: uuid(),
        expense_id: expenseId,
        number_current_of_parcel: 2,
        number_total_of_parcel: 2,
        value_of_parcel: 100,
        month: 2,
        year: 2024,
        is_paid: false,
      },
      'partial',
    ),
  ];

  beforeEach(() => {
    expenseSharedRepositoryMock = { create: jest.fn() };
    shareExpensesPersonRepositoryMock = { findById: jest.fn() };
    sut = new CreateExpenseSharedService(
      expenseSharedRepositoryMock as IExpensesSharedRepository,
      shareExpensesPersonRepositoryMock as IShareExpensesPersonRepository,
    );
  });

  it('should be able to do nothing when share_expense_people is empty', async () => {
    await expect(
      sut.execute({
        expense_months: expenseMonths,
        share_expense_people: [],
        user_id: userId,
      }),
    ).resolves.toBeUndefined();

    expect(shareExpensesPersonRepositoryMock.findById).not.toHaveBeenCalled();
    expect(expenseSharedRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should be able to throw an error if a share expense person does not exist', async () => {
    const sharePeople = [{ share_expense_person_id: 1, amount: 50 }];

    shareExpensesPersonRepositoryMock.findById = jest.fn().mockResolvedValueOnce(null);

    await expect(
      sut.execute({
        expense_months: expenseMonths,
        share_expense_people: sharePeople,
        user_id: userId,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(shareExpensesPersonRepositoryMock.findById).toHaveBeenCalledWith({
      id: 1,
      user_id: userId,
    });
    expect(expenseSharedRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should be able to throw an error if the sum of divisions exceeds the parcel value', async () => {
    const sharePeople = [
      { share_expense_person_id: 1, amount: 60 },
      { share_expense_person_id: 2, amount: 50 },
    ];

    shareExpensesPersonRepositoryMock.findById = jest.fn().mockResolvedValue({});

    await expect(
      sut.execute({
        expense_months: expenseMonths,
        share_expense_people: sharePeople,
        user_id: userId,
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(expenseSharedRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should be able to create all divisions when data is valid', async () => {
    const sharePeople = [
      { share_expense_person_id: 1, amount: 30 },
      { share_expense_person_id: 2, amount: 70 },
    ];

    shareExpensesPersonRepositoryMock.findById = jest.fn().mockResolvedValue({});

    await sut.execute({
      expense_months: expenseMonths,
      share_expense_people: sharePeople,
      user_id: userId,
    });

    expect(expenseSharedRepositoryMock.create).toHaveBeenCalledTimes(1);
    const createdList = (expenseSharedRepositoryMock.create as jest.Mock).mock.calls[0][0] as ExpenseShared[];

    expect(createdList).toHaveLength(expenseMonths.length * sharePeople.length);

    expect(createdList[0]).toMatchObject({
      expense_month_id: expenseMonths[0].id,
      share_expense_person_id: sharePeople[0].share_expense_person_id,
      amount: sharePeople[0].amount,
      is_paid: false,
    });

    expect(createdList[3]).toMatchObject({
      expense_month_id: expenseMonths[1].id,
      share_expense_person_id: sharePeople[1].share_expense_person_id,
      amount: sharePeople[1].amount,
      is_paid: false,
    });
  });
});