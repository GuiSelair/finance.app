import { Repository } from 'typeorm';

import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { UserMapper } from '../entities/UserMapper';
import type { IUsersRepository } from '@modules/User/domain/repositories/IUsersRepository';
import { User } from '@modules/User/domain/models/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<UserMapper>;

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(UserMapper);
  }

  public async create({ name, email, password }: User): Promise<UserMapper> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<UserMapper | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<UserMapper | null> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}
