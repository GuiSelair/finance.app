import { inject, injectable } from "tsyringe"

import { ShareExpensePerson } from "../models/ShareExpensePerson"
import { IShareExpensesPersonRepository } from "../repositories/IShareExpensesPersonRepository"

interface FindShareExpensePersonServiceInput {
  id: number
  user_id: string
}
type FindShareExpensePersonServiceOutput = Promise<{
  share_person: ShareExpensePerson | null
}>

@injectable()
export class FindShareExpensePersonService {
  constructor(
    @inject('ShareExpensesPersonRepository') private readonly shareExpensesPersonRepository: IShareExpensesPersonRepository,
  ){}

  async execute({ user_id, id }: FindShareExpensePersonServiceInput): FindShareExpensePersonServiceOutput {
    const shareExpensePeopleFound = await this.shareExpensesPersonRepository.findById({ id, user_id })

    return {
      share_person: shareExpensePeopleFound
    }
  }

}
