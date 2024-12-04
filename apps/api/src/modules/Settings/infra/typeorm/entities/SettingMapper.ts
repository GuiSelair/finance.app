import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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
}
