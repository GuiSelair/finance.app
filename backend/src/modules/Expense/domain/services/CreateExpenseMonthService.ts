import { inject, injectable } from 'tsyringe';
import { setDay, getMonth, getYear, isBefore } from 'date-fns';

import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { IExpensesMonthRepository } from '../repositories/IExpensesInMonthRepository';
import AppError from '@shared/errors/AppError';
import { Expense } from '../models/Expense';
import { ExpenseMonth } from '../models/ExpenseMonth';

interface IGetFirstMonthOfExpenseProps {
  purchaseDate: Date;
  cardId: string;
  userId: string;
}

@injectable()
export class CreateExpenseMonthService {
  private expenseMonthRepository: IExpensesMonthRepository;
  private cardsRepository: ICardsRepository;

  constructor(
    @inject('ExpensesMonthRepository')
    expenseMonthRepository: IExpensesMonthRepository,
    @inject('CardsRepository')
    cardsRepository: ICardsRepository,
  ) {
    this.expenseMonthRepository = expenseMonthRepository;
    this.cardsRepository = cardsRepository;
  }

  public async execute(expense: Expense): Promise<void> {
    const expensesMonthList = [] as ExpenseMonth[];
    const valueOfParcel = Number(expense.amount) / Number(expense.parcel);

    const firstMonth = await this.getFirstMonthOfExpense({
      purchaseDate: expense.purchase_date!,
      cardId: expense.card_id!,
      userId: expense.user_id!,
    });

    let currentYear = getYear(expense.purchase_date!);
    let currentMonth = firstMonth;

    for (let parcel = 1; parcel <= expense.parcel!; parcel++) {
      if (parcel !== 1) {
        currentMonth += 1;
      }

      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear += 1;
      }

      expensesMonthList.push(
        new ExpenseMonth(
          {
            expense_id: expense.id,
            number_current_of_parcel: parcel,
            number_total_of_parcel: expense.parcel,
            value_of_parcel: valueOfParcel,
            month: currentMonth,
            year: currentYear,
            is_paid: false,
          },
          'create',
        ),
      );
    }

    await this.expenseMonthRepository.create(expensesMonthList);
  }

  // TODO: Revisar lógica
  private async getFirstMonthOfExpense({
    purchaseDate,
    cardId,
    userId,
  }: IGetFirstMonthOfExpenseProps): Promise<number> {
    let turningDate: Date;

    const cardFound = await this.cardsRepository.findById(cardId, userId);
    if (!cardFound) throw new AppError('Error in generate expenses parcels, card not found.');

    turningDate = setDay(new Date(), cardFound.turning_day);

    if (isBefore(purchaseDate, turningDate)) {
      return getMonth(purchaseDate); // TODO: Vamos utilizar mes como mes atual + 1 para ter meses até 12?
    }

    return getMonth(purchaseDate) + 1;
  }
}

/**
 * Regra de negócio:
 * 1. Caso uma nova despesa seja adiciona:
 *    - Caso o cartão não esteja virado, adicionar despesa para ser cobrada no mês atual
 *    - Caso o cartão esteja virado, adicionar despesa para o próximo mês
 *
 * Exemplo:
 * - Cartão com virada para dia 25:
 *    - Data de virada: 25/09
 *    --------------------------
 *    1. Comprei hoje (12/09): Deve ser inserida com o mês atual (09)
 *    2. Comprei no dia de vencimento (25/09): Deve ser inserida para o próximo mês (10)
 *    3. Comprei depois do vencimento (01/10): Deve ser inserida com o mês atual (10)
 *    4. Comprei hoje (12/09) mas lancei no sistema dia (02/10): Deve ser inserida no mês anterior (09) --- ESSE PONTO FALHA
 */
