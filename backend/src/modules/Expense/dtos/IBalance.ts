export interface IBalance {
  totalOfExpenses: number;
  totalPayable: number;
  economy: number;
}

export interface IGetBalance {
  month: number;
  year: number;
  userId: string;
}
