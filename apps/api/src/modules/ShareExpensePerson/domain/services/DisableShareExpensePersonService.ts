import { inject, injectable } from "tsyringe";
import { IShareExpensesPersonRepository } from "../repositories/IShareExpensesPersonRepository";
import AppError from "@shared/errors/AppError";

interface DisableShareExpensePersonInput {
  id: number;
  user_id: string;
}

@injectable()
export class DisableShareExpensePersonService {
  constructor(@inject('ShareExpensesPersonRepository') private readonly shareExpensesPersonRepository: IShareExpensesPersonRepository){}

  async execute({ id, user_id }: DisableShareExpensePersonInput) {
    const shareExpensePersonToEdit = await this.shareExpensesPersonRepository.findById({ id, user_id })

    if (!shareExpensePersonToEdit) {
      throw new AppError('[ERROR] Share person not exists.')
    }

    await this.shareExpensesPersonRepository.disable({ id, user_id })
  }
}
