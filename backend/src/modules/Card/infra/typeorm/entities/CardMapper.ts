import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper';

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
}
