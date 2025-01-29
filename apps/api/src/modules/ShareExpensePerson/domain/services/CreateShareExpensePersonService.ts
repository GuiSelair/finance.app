import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"
import { ShareExpensePerson } from "../models/ShareExpensePerson"
import { IShareExpensesPersonRepository } from "../repositories/IShareExpensesPersonRepository"

interface CreateShareExpensePersonServiceInput {
  name: string
  whatsapp: string
  day_to_send_message: string
  user_id: string
}
type CreateShareExpensePersonServiceOutput = Promise<ShareExpensePerson>

@injectable()
export class CreateShareExpensePersonService {
  constructor(
    @inject('ShareExpensesPersonRepository') private readonly shareExpensesPersonRepository: IShareExpensesPersonRepository,
  ){}

  async execute(props: CreateShareExpensePersonServiceInput): CreateShareExpensePersonServiceOutput {
    const shareExpensePersonModel = this.makeShareExpensePersonModel(props)

    const peopleWithSameName = await this.shareExpensesPersonRepository.findByName({ name: shareExpensePersonModel.name!, user_id: shareExpensePersonModel.user_id! })
    if (peopleWithSameName) {
      throw new AppError('[ERROR]: Name of person must be unique.');
    }

    return await this.shareExpensesPersonRepository.create(shareExpensePersonModel)
  }

  private makeShareExpensePersonModel(props: Omit<ShareExpensePerson, 'day_to_send_message'>) {
    return new ShareExpensePerson(props, 'create')
  }
}
