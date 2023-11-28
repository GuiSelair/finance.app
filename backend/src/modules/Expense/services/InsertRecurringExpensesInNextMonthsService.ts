import { injectable, inject } from 'tsyringe';
import { addMonths, addYears, getMonth, getYear } from 'date-fns';

import IExpensesRepository from '../repositories/IExpensesRepository';
import IExpensesInMonthRepository from '../repositories/IExpensesInMonthRepository';
import ICreateExpenseInMonth from '../dtos/ICreateExpenseInMonth';

interface IInsertRecurringExpensesInNextMonthsServiceProps {
  userId: string;
}

@injectable()
export class InsertRecurringExpensesInNextMonthsService {
  private expensesRepository: IExpensesRepository;
  private expensesInMonthRepository: IExpensesInMonthRepository;

  constructor(
    @inject('ExpensesRepository')
    expensesRepository: IExpensesRepository,
    @inject('ExpensesMonthRepository')
    expensesInMonthRepository: IExpensesInMonthRepository
  ){
    this.expensesRepository = expensesRepository;
    this.expensesInMonthRepository = expensesInMonthRepository;
  }

  public async execute({ userId }: IInsertRecurringExpensesInNextMonthsServiceProps): Promise<void> {
    /**
     * 1. Pegar todas as despesas fixas
     * 2. Pegar as despesas do próximo mês
     * 3. Verificar se a despesa fixa já existe no próximo mês, se não existir, inserir
     */
    const currentMonth = getMonth(new Date());
    const currentYear = getYear(new Date());
    const nextMonth = getMonth(addMonths(currentMonth, 1));
    const nextYear = getYear(addYears(currentYear, 1));

    const recurringExpenses = await this.expensesRepository.fetchAllRecurringExpenses(userId)
    if (!recurringExpenses?.length) return;

    const expensesInMonth = await this.expensesInMonthRepository.findByMonthAndYear(currentMonth, currentYear, userId)
    const expensesInMonthIds = expensesInMonth?.map(expense => expense.expense_id) ?? [];
    const recurringExpensesToInsertAgain = recurringExpenses.filter(expense => !expensesInMonthIds.includes(expense.id));

    const expensesInMonthToInsert = recurringExpensesToInsertAgain.map((expense): ICreateExpenseInMonth => {
      return {
        expense_id: expense.id,
        number_current_of_parcel: 1,
        number_total_of_parcel: 1,
        value_of_parcel: expense.amount,
        month: nextMonth,
        year: nextYear,
      }
    });

    await this.expensesInMonthRepository.create(expensesInMonthToInsert);
    return;
  }
}
