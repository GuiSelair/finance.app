import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, DeleteDateColumn } from 'typeorm'

import { ShareExpensePerson } from "@modules/ShareExpensePerson/domain/models/ShareExpensePerson";
import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper';

@Entity('share_expense_people')
export class ShareExpensePersonMapper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  whatsapp: string;

  @Column()
  day_to_send_message: number;

  @Column()
  user_id: string;

  @ManyToOne(() => UserMapper)
  @JoinColumn({ name: 'user_id' })
  user: UserMapper

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  static toModel(data: ShareExpensePersonMapper): ShareExpensePerson {
    return new ShareExpensePerson({
      id: data.id,
      name: data.name,
      whatsapp: data.whatsapp,
      day_to_send_message: String(data.day_to_send_message),
      user_id: data.user_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      deleted_at: data.deleted_at
    });
  }
}
