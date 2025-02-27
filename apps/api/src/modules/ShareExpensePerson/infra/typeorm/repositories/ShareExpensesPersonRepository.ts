import { Repository } from "typeorm";
import { ShareExpensePersonMapper } from "../entities/ShareExpensePersonMapper";
import { DataSourceConfiguration } from "@shared/infra/typeorm/bootstrap";
import { ShareExpensePerson } from "@modules/ShareExpensePerson/domain/models/ShareExpensePerson";
import { DisableInput, FetchInput, FindByIdInput, FindByNameInput, IShareExpensesPersonRepository } from "@modules/ShareExpensePerson/domain/repositories/IShareExpensesPersonRepository";

export class ShareExpensesPersonRepository implements IShareExpensesPersonRepository {
  private repository: Repository<ShareExpensePersonMapper>

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(ShareExpensePersonMapper)
  }

  private makeShareExpensePersonMapper(input: ShareExpensePerson): ShareExpensePersonMapper {
    return Object.assign(new ShareExpensePersonMapper(), input)
  }

  public async fetch({ user_id }: FetchInput): Promise<ShareExpensePerson[]> {
    const mappers = await this.repository.find({
      where: {
        user_id
      },
    })

    return mappers?.map(ShareExpensePersonMapper.toModel) || []
  }

  public async create(args: ShareExpensePerson): Promise<ShareExpensePerson> {
    const shareExpensePersonMapper = this.makeShareExpensePersonMapper(args)
    const shareExpensePerson = this.repository.create(shareExpensePersonMapper)
    await this.repository.save(shareExpensePerson)
    return ShareExpensePersonMapper.toModel(shareExpensePerson)
  }

  public async findByName({ name, user_id }: FindByNameInput): Promise<ShareExpensePerson | null> {
    const mapperFound = await this.repository.findOneBy({
      name,
      user_id
    })

    return mapperFound ? ShareExpensePersonMapper.toModel(mapperFound) : null
  }

  public async findById({ id, user_id }: FindByIdInput): Promise<ShareExpensePerson | null> {
    const mapperFound = await this.repository.findOneBy({
      id,
      user_id
    })

    return mapperFound ? ShareExpensePersonMapper.toModel(mapperFound) : null
  }

  public async update(args: ShareExpensePerson): Promise<ShareExpensePerson> {
    const shareExpensePersonMapper = this.makeShareExpensePersonMapper(args)
    await this.repository.update({ id: args.id }, shareExpensePersonMapper)
    return ShareExpensePersonMapper.toModel(shareExpensePersonMapper)
  }

  public async disable(args: DisableInput): Promise<void> {
    this.repository.softDelete({ id: args.id, user_id: args.user_id })
  }
}
