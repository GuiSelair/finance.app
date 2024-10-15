import { setDate, isBefore, getMonth } from 'date-fns';

export function calculateExpenseMonth(purchaseDate: Date, turningDay: number): { isInCurrentMonth: boolean, month: number } {
  const turningDate = setDate(purchaseDate, turningDay);
  
	if (isBefore(purchaseDate, turningDate)) {
    return {
      isInCurrentMonth: true,
      month: getMonth(purchaseDate)
    }

  }

  return {
    isInCurrentMonth: false,
    month: getMonth(purchaseDate) + 1
  }
}