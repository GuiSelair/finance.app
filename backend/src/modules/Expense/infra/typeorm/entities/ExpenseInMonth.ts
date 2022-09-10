import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Expense from './Expense';

@Entity('expenses-month')
class ExpenseMonth {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expense_id: string;

  @ManyToOne(() => Expense, { cascade: true })
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @Column()
  number_current_of_parcel: number;

  @Column()
  number_total_of_parcel: number;

  @Column()
  month: number;

  @Column()
  year: number;

  @Column({
    type: 'float4',
  })
  value_of_parcel: number;

  @Column({
    default: false,
  })
  isPaid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ExpenseMonth;
