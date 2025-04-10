import { injectable, inject } from "tsyringe";
import { IExpensesSharedRepository } from "../repositories/IExpensesSharedRepository";
import { Expense } from "../models/Expense";
import { ExpenseShared } from "../models/ExpenseShared";
import AppError from "@shared/errors/AppError";
import { IShareExpensesPersonRepository } from "@modules/ShareExpensePerson/domain/repositories/IShareExpensesPersonRepository";

interface CreateExpenseSharedServiceInput {
  expense_month_ids: string[];
  share_expense_people: Expense['share_expense_people'];
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

  public async execute({ expense_month_ids, share_expense_people, user_id }: CreateExpenseSharedServiceInput): Promise<void> {
    if (!share_expense_people) return;

    for (const shareExpensePerson of share_expense_people) {
      const shareExpensePersonExists = await this.shareExpensesPersonRepository.findById({ id: shareExpensePerson.share_expense_person_id, user_id: user_id });
      if (!shareExpensePersonExists) {
        throw new AppError('[ERROR]: Share expense person not found');
      }
    }

    // TODO: Fazer lógica para calcular o valor de cada pessoa
    const expenseSharedList = [] as ExpenseShared[];

    for (const expenseMonthId of expense_month_ids) {
      for (const shareExpensePerson of share_expense_people) {
        expenseSharedList.push(new ExpenseShared({
          expense_month_id: expenseMonthId,
          share_expense_person_id: shareExpensePerson.share_expense_person_id,
          amount: shareExpensePerson.amount,
          is_paid: false,
        }, 'create'));
      }
    }

    await this.expenseSharedRepository.create(expenseSharedList);
  }
}
