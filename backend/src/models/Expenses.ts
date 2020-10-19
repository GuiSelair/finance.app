import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Cards from './Cards';

@Entity('expenses')
class Expenses {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  purchase_date: Date;

  @CreateDateColumn()
  due_date?: Date;

  @Column()
  amount: number;

  @Column()
  split_expense: boolean;

  @Column()
  share_with: string;

  @Column()
  percentage_of_each: string;

  @ManyToOne(() => Cards)
  card_id: string;

  @Column()
  parcel: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Expenses;
