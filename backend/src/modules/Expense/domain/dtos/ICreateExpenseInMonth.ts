export default interface ICreateExpenseInMonth {
  expense_id: string;
  number_current_of_parcel: number;
  number_total_of_parcel: number;
  value_of_parcel: number;
  month: number;
  year: number;
}

export interface IGetFirstMonthOfExpense {
  purchaseDate: Date;
  cardId?: string;
}
