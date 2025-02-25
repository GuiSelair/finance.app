import { ShareExpensePerson } from "../models/ShareExpensePerson";

export type FetchInput = { user_id: string }
export type FindByNameInput = { name: string, user_id: string }

export interface IShareExpensesPersonRepository {
  create: (args: ShareExpensePerson) => Promise<ShareExpensePerson>
  findByName: (args: FindByNameInput) => Promise<ShareExpensePerson | null>
  fetch: (args: FetchInput) => Promise<ShareExpensePerson[] | null>
}
