import { v4 as uuidv4 } from 'uuid';

import { IUsersRepository } from '../IUsersRepository';
import { UserMapper } from '@modules/User/infra/typeorm/entities/UserMapper';
import { User } from '../../models/User';

export class FakeUsersRepository implements IUsersRepository {
  private users: UserMapper[] = [];

  public async create({ email, name, password }: User): Promise<UserMapper> {
    const user = new UserMapper();
    Object.assign(user, { id: uuidv4(), email, name, password });
    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<UserMapper | null> {
    return this.users.find(registeredUser => registeredUser.email === email) || null;
  }

  public async findById(id: string): Promise<UserMapper | null> {
    return this.users.find(registeredUser => registeredUser.id === id) || null;
  }
}
