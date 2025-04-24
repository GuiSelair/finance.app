import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { IExpensesSharedRepository } from "../repositories/IExpensesSharedRepository";
import { Expense } from "../models/Expense";
import { ExpenseShared } from "../models/ExpenseShared";
import { IShareExpensesPersonRepository } from "@modules/ShareExpensePerson/domain/repositories/IShareExpensesPersonRepository";
import { ExpenseMonth } from "../models/ExpenseMonth";

export interface ShareExpensePeopleInput {
  share_expense_person_id: number;
  amount: number;
}

interface CreateExpenseSharedServiceInput {
  expense_months: ExpenseMonth[];
  share_expense_people: ShareExpensePeopleInput[];
  user_id: string;
}

@injectable()
export class CreateExpenseSharedService {
  constructor(
    @inject('ExpensesSharedRepository')
    private expenseSharedRepository: IExpensesSharedRepository,
    @inject('ShareExpensesPersonRepository')
    private shareExpensesPersonRepository: IShareExpensesPersonRepository,
  ) {}

  public async execute({ expense_months, share_expense_people, user_id }: CreateExpenseSharedServiceInput): Promise<void> {
    if (!share_expense_people.length) return;

    await this.checkIfSharePeopleExists(share_expense_people, user_id);
    const expenseMonthParcelValue = expense_months[0].value_of_parcel!;
    await this.checkDivisionsNotExceedParcelValue(expenseMonthParcelValue, share_expense_people);

    const expenseSharedList = [] as ExpenseShared[];

    for (const expenseMonth of expense_months) {
      for (const shareExpensePerson of share_expense_people) {
        expenseSharedList.push(new ExpenseShared({
          expense_month_id: expenseMonth.id!,
          share_expense_person_id: shareExpensePerson.share_expense_person_id,
          amount: shareExpensePerson.amount,
          is_paid: false,
        }, 'create'));
      }
    }

    await this.expenseSharedRepository.create(expenseSharedList);
  }

  private async checkDivisionsNotExceedParcelValue(expenseMonthParcelValue: number, expenseSharedList: ExpenseShared[]): Promise<void> {
    const divisionSum = expenseSharedList.reduce((acc, expenseShared) => acc + expenseShared.amount!, 0);
    if (divisionSum > expenseMonthParcelValue) {
      throw new AppError('[ERROR]: Divisions not exceed parcel value');
    }
  }

  private async checkIfSharePeopleExists(share_expense_people: ShareExpensePeopleInput[], user_id: string): Promise<void> {
    for (const shareExpensePerson of share_expense_people) {
      const shareExpensePersonExists = await this.shareExpensesPersonRepository.findById({ id: shareExpensePerson.share_expense_person_id, user_id: user_id });
      if (!shareExpensePersonExists) {
        throw new AppError('[ERROR]: Share expense person not found');
      }
    }
  }
}