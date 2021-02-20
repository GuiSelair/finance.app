export default interface ICreateExpenseRequest {
  name: string;
  description: string;
  due_date?: Date;
  amount: number;
  split_expense?: boolean;
  share_with?: string[];
  percentage_of_each?: string[];
  card_id?: string;
  user_id: string;
  parcel: number;
}
