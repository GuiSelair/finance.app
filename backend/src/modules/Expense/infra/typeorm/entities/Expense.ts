import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

import Card from '@modules/Card/infra/typeorm/entities/Card';
import User from '@modules/User/infra/typeorm/entities/UserMapper';

@Entity('expenses')
class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @CreateDateColumn()
  purchase_date: Date;

  @CreateDateColumn({
    nullable: true,
  })
  due_date?: Date;

  @Column({
    type: 'float4',
  })
  amount: number;

  @Column()
  split_expense?: boolean;

  @Column({
    nullable: true,
  })
  share_with?: string;

  @Column({
    nullable: true,
  })
  value_of_each?: string;

  @Column()
  is_recurring: boolean;

  @Column()
  card_id: string;

  @ManyToOne(() => Card, { cascade: true })
  @JoinColumn({ name: 'card_id' })
  card: Card;

  @Column()
  user_id: string;

  @ManyToOne(() => User, { cascade: true })
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
