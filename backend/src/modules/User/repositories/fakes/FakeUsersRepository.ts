import { v4 as uuidv4 } from 'uuid';

import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuidv4(), email, name, password });
    this.users.push(user);
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.users.find(
      registeredUser => registeredUser.email === email,
    ) || null;
  }

  public async findById(id: string): Promise<User | null> {
    return this.users.find(
      registeredUser => registeredUser.id === id,
    ) || null;
  }
}

export default FakeUsersRepository;
