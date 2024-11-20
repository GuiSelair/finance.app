import { Income as IncomeModel } from "../models/Income";

export interface IIncomesRepository {
  createOrUpdate(args: IncomeModel): Promise<any>
}
