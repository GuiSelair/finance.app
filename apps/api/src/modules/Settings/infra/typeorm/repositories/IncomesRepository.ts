import { Repository } from 'typeorm'

import { Income as IncomeModel } from '@modules/Settings/domain/models/Income';
import { FindByMonthAndYearInput, IIncomesRepository } from "@modules/Settings/domain/repositories/IIncomeRepository";
import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { SettingMapper } from '../entities/SettingMapper';

export class IncomesRepository implements IIncomesRepository {
  private repository: Repository<SettingMapper>;

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(SettingMapper);
  }

  async createOrUpdate(args: IncomeModel): Promise<SettingMapper> {
    const { id, ...settingMapperWithoutId } = this.makeSettingMapper(args);
    const incomeFound = await this.repository.findOne({
      where: {
        key: settingMapperWithoutId.key,
        month: settingMapperWithoutId.month,
        year: settingMapperWithoutId.year,
        user_id: settingMapperWithoutId.user_id
      }
    })

    if (!incomeFound) {
      return await this.repository.save(
        this.repository.create(settingMapperWithoutId)
      )
    }

    await this.repository.update({ id: incomeFound.id }, settingMapperWithoutId)
    return Object.assign(incomeFound, settingMapperWithoutId)
  }

  async findByMonthAndYear(args: FindByMonthAndYearInput): Promise<SettingMapper | null> {
    return await this.repository.findOne({
      where: {
        key: 'income',
        month: args.month,
        year: args.year,
        user_id: args.user_id
      },
      select: ['id', 'key', 'value', 'month', 'year']
    })
  }

  private makeSettingMapper(incomeModel: IncomeModel) {
    return Object.assign(new SettingMapper(), {
      key: 'income',
      value: String(incomeModel.income),
      month: incomeModel.month,
      year: incomeModel.year,
      user_id: incomeModel.user_id,
      default: false,
    } as SettingMapper);
  }

}
