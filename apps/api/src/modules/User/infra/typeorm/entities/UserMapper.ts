import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { User } from '@modules/User/domain/models/User';

@Entity('users')
export class UserMapper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  static toModel(data: UserMapper): User {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  }
}
