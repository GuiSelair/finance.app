import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

import Card from '../../../../Card/infra/typeorm/entities/Card';
import User from '../../../../User/infra/typeorm/entities/User';

@Entity('expenses')
class Expense {
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
  split_expense?: boolean;

  @Column()
  share_with?: string;

  @Column()
  percentage_of_each?: string;

  @Column()
  card_id: string;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  parcel: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Expense;
