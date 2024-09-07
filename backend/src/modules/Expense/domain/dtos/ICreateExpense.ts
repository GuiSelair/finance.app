export default interface ICreateExpense {
  name: string;
  amount: number;
  card_id: string;
  user_id: string;
  parcel: number;
  purchase_date?: Date;
  description: string;
  due_date?: Date;
  split_expense?: boolean;
  share_with?: string | string[];
  value_of_each?: string | number[];
  is_recurring?: boolean;
}
