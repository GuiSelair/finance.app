import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CardMapper } from '@modules/Card/infra/typeorm/entities/CardMapper';
import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper';
import { Expense } from '@modules/Expense/domain/models/Expense';

@Entity('expenses')
export class ExpenseMapper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @CreateDateColumn()
  purchase_date: string;

  @CreateDateColumn({
    nullable: true,
  })
  due_date?: string;

  @Column({
    type: 'float4',
  })
  amount: number;

  @Column()
  is_recurring: boolean;

  @Column()
  is_splitted: boolean;

  @Column()
  card_id: string;

  @ManyToOne(() => CardMapper, { cascade: true })
  @JoinColumn({ name: 'card_id' })
  card: CardMapper;

  @Column()
  user_id: string;

  @ManyToOne(() => UserMapper, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserMapper;

  @Column()
  parcel: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static toModel(data: ExpenseMapper): Expense {
    return new Expense({
      id: data.id,
      name: data.name,
      description: data.description,
      purchase_date: data.purchase_date,
      due_date: data.due_date,
      amount: data.amount,
      is_recurring: data.is_recurring,
      is_splitted: data.is_splitted,
      card_id: data.card_id,
      user_id: data.user_id,
      parcel: data.parcel,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  }
}
