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
  is_recurring: boolean;

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
}
