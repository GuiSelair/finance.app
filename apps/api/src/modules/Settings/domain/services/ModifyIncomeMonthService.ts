import { IUsersRepository } from "@modules/User/domain/repositories/IUsersRepository";
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
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
    @inject('InvoiceRepository') private readonly incomesRepository: IIncomesRepository,
    @inject('UsersRepository') private readonly usersRepository: IUsersRepository,
  ){}

  async execute(args: IModifyIncomeMonthDTO){
    const userFound = await this.usersRepository.findById(args.user_id);
    if(!userFound) { throw new AppError('User not found', 404) }

    const invoiceModel = this.makeInvoiceModel(args)

    const setting = await this.incomesRepository.createOrUpdate(invoiceModel);

    return setting;
  }

  private makeInvoiceModel(args: IModifyIncomeMonthDTO){
    return new Income({
      ...args,
    });
  }
}
