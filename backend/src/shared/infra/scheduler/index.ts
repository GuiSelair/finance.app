import schedule from 'node-schedule';
import processRecurringExpenses from './scripts/processRecurringExpenses';

/**
 * Esse script deve ser executado todo dia 15º de cada mês.
 */
const processRecurringExpensesJob = schedule.scheduleJob(
  '* * 15 * *',
  async () => {
    await processRecurringExpenses();
  },
);

function devStartScheduler() {
  console.log('DEV Starting scheduler... PROCESSING!');
  return new Promise(() =>
    setTimeout(() => {
      processRecurringExpenses();
      console.log('DEV Starting scheduler... DONE!');
    }, 3000),
  );
}

function startScheduler() {
  console.log('Starting scheduler... PROCESSING!');
  processRecurringExpensesJob.invoke();
  console.log('Starting scheduler... DONE!');
}

export default {
  startScheduler: devStartScheduler,
};
