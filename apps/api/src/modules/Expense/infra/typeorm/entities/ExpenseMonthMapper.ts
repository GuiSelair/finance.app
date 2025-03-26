import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ExpenseMapper } from './ExpenseMapper';
import { ExpenseMonth } from '@modules/Expense/domain/models/ExpenseMonth';

@Entity('expenses-month')
export class ExpenseMonthMapper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expense_id: string;

  @ManyToOne(() => ExpenseMapper, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'expense_id' })
  expense: ExpenseMapper;

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
  is_paid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static toModel(data: ExpenseMonthMapper): ExpenseMonth {
    return new ExpenseMonth({
      id: data.id,
      expense_id: data.expense_id,
      expense: data.expense,
      number_current_of_parcel: data.number_current_of_parcel,
      number_total_of_parcel: data.number_total_of_parcel,
      month: data.month,
      year: data.year,
      value_of_parcel: data.value_of_parcel,
      is_paid: data.is_paid,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  }
}
