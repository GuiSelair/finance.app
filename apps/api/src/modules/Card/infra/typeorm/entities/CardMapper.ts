import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper';
import { Card } from '@modules/Card/domain/models/Card';

@Entity('cards')
export class CardMapper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => UserMapper)
  @JoinColumn({ name: 'user_id' })
  user: UserMapper;

  @Column()
  name: string;

  @Column()
  flag: string;

  @Column()
  due_day: number;

  @Column()
  turning_day: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  static toModel(data: CardMapper): Card {
    return new Card({
      id: data.id,
      user_id: data.user_id,
      name: data.name,
      flag: data.flag,
      due_day: data.due_day,
      turning_day: data.turning_day,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  }
}
