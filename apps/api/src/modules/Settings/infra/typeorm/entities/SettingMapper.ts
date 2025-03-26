import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Setting } from '@modules/Settings/domain/models/Setting';

@Entity('settings')
export class SettingMapper {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  key: string

  @Column()
  value: string

  @Column({ default: false, nullable: true })
  default: boolean

  @Column()
  user_id: string

  @ManyToOne(() => UserMapper)
  @JoinColumn({ name: 'user_id' })
  user: UserMapper

  @Column({ nullable: true })
  month: number

  @Column({ nullable: true })
  year: number

  @CreateDateColumn()
  created_at?: Date

  static toModel(data: SettingMapper): Setting {
    return new Setting({
      id: data.id,
      key: data.key,
      value: data.value,
      default: data.default,
      user_id: data.user_id,
      month: data.month,
      year: data.year,
      created_at: data.created_at,
    });
  }
}
