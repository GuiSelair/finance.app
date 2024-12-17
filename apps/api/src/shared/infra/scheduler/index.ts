import schedule from 'node-schedule';
import processRecurringExpenses from './scripts/processRecurringExpenses';

/**
 * Esse script deve ser executado todo dia 15º de cada mês às 00:00.
 */
const processRecurringExpensesJob = schedule.scheduleJob('0 0 15 * *', async () => {
  await processRecurringExpenses();
});

function devStartScheduler() {
  console.log('✅ Scheduler Job: ON');
  // TODO: Remover Promise
  return new Promise(() =>
    setTimeout(() => {
      processRecurringExpenses();
    }, 3000),
  );
}

function startScheduler() {
  console.log('Starting scheduler... PROCESSING!');
  processRecurringExpensesJob.invoke();
  console.log('Starting scheduler... DONE!');
}

export const schedulerJob = {
  start: devStartScheduler,
};
