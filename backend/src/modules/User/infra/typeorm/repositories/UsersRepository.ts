import { Repository } from 'typeorm';

import { ConnectionSource } from '../../../../../shared/infra/typeorm/bootstrap';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = ConnectionSource.getRepository(User)
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
