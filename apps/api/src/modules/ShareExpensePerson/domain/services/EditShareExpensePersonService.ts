import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"
import { ShareExpensePerson } from "../models/ShareExpensePerson"
import { IShareExpensesPersonRepository } from "../repositories/IShareExpensesPersonRepository"

interface EditShareExpensePersonServiceInput {
  id: number
  name: string
  whatsapp: string
  day_to_send_message: string
  user_id: string
}
type EditShareExpensePersonServiceOutput = Promise<ShareExpensePerson>

@injectable()
export class EditShareExpensePersonService {
  constructor(
    @inject('ShareExpensesPersonRepository') private readonly shareExpensesPersonRepository: IShareExpensesPersonRepository,
  ){}

  async execute(props: EditShareExpensePersonServiceInput): EditShareExpensePersonServiceOutput {
    const shareExpensePersonModel = this.makeShareExpensePersonModel(props)

    const shareExpensePersonToEdit = await this.shareExpensesPersonRepository.findById({ id: shareExpensePersonModel.id!, user_id: shareExpensePersonModel.user_id! })

    if (!shareExpensePersonToEdit) {
      throw new AppError('[ERROR] Share person not exists.')
    }

    if (shareExpensePersonModel.name !== shareExpensePersonToEdit?.name) {
      const peopleWithSameName = await this.shareExpensesPersonRepository.findByName({ name: shareExpensePersonModel.name!, user_id: shareExpensePersonModel.user_id! })
      if (peopleWithSameName) {
        throw new AppError('[ERROR]: Name of person must be unique.');
      }
    }

    return await this.shareExpensesPersonRepository.update(shareExpensePersonModel)
  }

  private makeShareExpensePersonModel(props: Omit<ShareExpensePerson, 'day_to_send_message'>) {
    return new ShareExpensePerson(props)
  }
}
