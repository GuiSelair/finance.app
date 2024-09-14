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
}
