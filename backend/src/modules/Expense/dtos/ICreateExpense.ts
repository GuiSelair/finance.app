export default interface ICreateExpense {
  name: string;
  description: string;
  purchase_date?: Date;
  due_date?: Date;
  amount: number;
  split_expense?: boolean;
  share_with?: string | string[];
  value_of_each?: string | number[];
  card_id?: string;
  user_id: string;
  parcel?: number;
}
