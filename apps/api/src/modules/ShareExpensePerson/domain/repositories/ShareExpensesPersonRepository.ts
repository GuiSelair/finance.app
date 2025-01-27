import { ShareExpensePersonMapper } from "@modules/ShareExpensePerson/infra/typeorm/entities/ShareExpensePersonMapper";
import { ShareExpensePerson } from "../models/ShareExpensePerson";

export type FindByNameInput = { name: string, user_id: string }

export interface IShareExpensesPersonRepository {
  create: (args: ShareExpensePerson) => Promise<ShareExpensePersonMapper>
  findByName: (args: FindByNameInput) => Promise<ShareExpensePersonMapper[] | null>
}
