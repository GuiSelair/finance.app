export default interface ICreateExpense {
  name: string;
  description: string;
  purchase_date: Date;
  due_date?: Date;
  amount: number;
  split_expense?: boolean;
  share_with?: string;
  value_of_each?: string;
  card_id?: string;
  user_id: string;
  parcel: number;
}
