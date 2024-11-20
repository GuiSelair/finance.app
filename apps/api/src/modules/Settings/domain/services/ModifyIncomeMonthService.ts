import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "@modules/User/domain/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { IIncomesRepository } from "../repositories/IIncomeRepository";
import { Income } from "../models/Income";

interface IModifyIncomeMonthDTO{
  month: number;
  year: number;
  income: number;
  user_id: string;
}

@injectable()
export class ModifyIncomeMonthService {
  constructor(
    @inject('IncomesRepository') private readonly incomesRepository: IIncomesRepository,
  ){}

  async execute(args: IModifyIncomeMonthDTO){
    const invoiceModel = this.makeInvoiceModel(args)
    const setting = await this.incomesRepository.createOrUpdate(invoiceModel);
    return {
      income: setting
    };
  }

  private makeInvoiceModel(args: IModifyIncomeMonthDTO){
    return new Income({
      ...args,
    });
  }
}
