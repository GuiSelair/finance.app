import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { ExpenseMonthMapper } from "./ExpenseMonthMapper";
import { ShareExpensePersonMapper } from "@modules/ShareExpensePerson/infra/typeorm/entities/ShareExpensePersonMapper";
import { ExpenseMonthSharePerson } from "@modules/Expense/domain/models/ExpenseMonthSharePerson";

@Entity('expenses_month_share_people')
export class ExpenseMonthSharePersonMapper {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ExpenseMonthMapper, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'expense_month_id' })
  expense_month: ExpenseMonthMapper;

  @Column()
  expense_month_id: string;

  @ManyToOne(() => ShareExpensePersonMapper, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'share_expense_person_id' })
  share_expense_person: ShareExpensePersonMapper;

  @Column()
  share_expense_person_id: number;

  @Column({
    type: 'float4',
  })
  amount: number;

  @Column()
  is_paid: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static toModel(data: ExpenseMonthSharePersonMapper): ExpenseMonthSharePerson {
    return new ExpenseMonthSharePerson({
      id: data.id,
      expense_month_id: data.expense_month_id,
      expense_month: data.expense_month ? ExpenseMonthMapper.toModel(data.expense_month) : undefined,
      share_expense_person_id: data.share_expense_person_id,
      share_expense_person: data.share_expense_person ? ShareExpensePersonMapper.toModel(data.share_expense_person) : undefined,
      amount: data.amount,
      is_paid: data.is_paid,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });
  }
}
