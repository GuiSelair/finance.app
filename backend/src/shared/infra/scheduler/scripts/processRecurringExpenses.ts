import { container } from 'tsyringe';

import { InsertRecurringExpensesService } from '@modules/Expense/domain/services/InsertRecurringExpensesService';

/**
 * Essa script é responsável por inserir as despesas recorrentes no próximo mês.
 */
export default async function processRecurringExpenses() {
  try {
    console.log('='.repeat(50));
    console.log('Processing recurring expenses... PROCESSING!');
    const insertRecurringExpensesService = container.resolve(InsertRecurringExpensesService);
    await insertRecurringExpensesService.execute();
    console.log('Processing recurring expenses... DONE!');
  } catch (error) {
    console.log('Processing recurring expenses... ERROR!');
    console.log(error);
  } finally {
    console.log('='.repeat(50));
  }
}
