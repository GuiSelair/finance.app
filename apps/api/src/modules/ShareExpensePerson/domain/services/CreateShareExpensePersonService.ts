import { inject } from "tsyringe"
import { ShareExpensePerson } from "../models/ShareExpensePerson"
import { IShareExpensesPersonRepository } from "../repositories/ShareExpensesPersonRepository"

interface CreateShareExpensePersonServiceInput {
  name: string
  whatsapp: string
  day_to_send_message: string
  user_id: string
}
interface CreateShareExpensePersonServiceOutput {}

export class CreateShareExpensePersonService {
  constructor(
    @inject('ShareExpensesPersonRepository') private readonly shareExpensesPersonRepository: IShareExpensesPersonRepository,
  ){}

  async execute(props: CreateShareExpensePersonServiceInput) {
    const shareExpensePersonModel = this.makeShareExpensePersonModel(props)
    // TODO: Continuar service
  }

  private makeShareExpensePersonModel(props: ShareExpensePerson) {
    return new ShareExpensePerson(props, 'create')
  }
}
