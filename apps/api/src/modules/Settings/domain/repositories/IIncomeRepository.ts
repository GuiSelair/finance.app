import { SettingMapper } from "@modules/Settings/infra/typeorm/entities/SettingMapper";
import { Income as IncomeModel } from "../models/Income";

export type FindByMonthAndYearInput = {
  month: number;
  year: number;
  user_id: string;
}

export interface IIncomesRepository {
  createOrUpdate(args: IncomeModel): Promise<SettingMapper>;
  findByMonthAndYear(args: FindByMonthAndYearInput): Promise<SettingMapper | null>;
}
