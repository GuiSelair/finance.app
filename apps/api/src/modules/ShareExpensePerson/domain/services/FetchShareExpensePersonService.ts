import { inject, injectable } from "tsyringe"

import { ShareExpensePerson } from "../models/ShareExpensePerson"
import { IShareExpensesPersonRepository } from "../repositories/IShareExpensesPersonRepository"

interface FetchShareExpensePersonServiceInput {
  user_id: string
}
type FetchShareExpensePersonServiceOutput = Promise<{
  sharePeople: ShareExpensePerson[]
}>

@injectable()
export class FetchShareExpensePersonService {
  constructor(
    @inject('ShareExpensesPersonRepository') private readonly shareExpensesPersonRepository: IShareExpensesPersonRepository,
  ){}

  async execute({ user_id }: FetchShareExpensePersonServiceInput): FetchShareExpensePersonServiceOutput {
    const shareExpensePeopleFound = await this.shareExpensesPersonRepository.fetch({ user_id })

    return {
      sharePeople: shareExpensePeopleFound || []
    }
  }

}
