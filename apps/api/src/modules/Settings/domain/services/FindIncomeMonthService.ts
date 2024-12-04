import { injectable, inject } from "tsyringe";

import { IIncomesRepository } from "../repositories/IIncomeRepository";
import { Income } from "../models/Income";

interface IFindIncomeMonthDTO{
  month: number;
  year: number;
  user_id: string;
}

@injectable()
export class FindIncomeMonthService {
  constructor(
    @inject('IncomesRepository') private readonly incomesRepository: IIncomesRepository,
  ){}

  async execute({ month, user_id, year }: IFindIncomeMonthDTO){
    const incomeFound = await this.incomesRepository.findByMonthAndYear({ month, user_id, year });

    if (!incomeFound) { return { income: null } }

    const { value: incomeValue, ...incomeFoundWithoutValue } = incomeFound
    return {
      income: new Income({
        ...incomeFoundWithoutValue,
        income: Number(incomeValue),
      }, 'partial')
    }
  }
}
