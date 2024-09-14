import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import IHashProvider from '@providers/HashProvider/models/IHashProvider';

import { User } from '../models/User';
import { IUsersRepository } from '../repositories/IUsersRepository';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserService {
  private userRepository: IUsersRepository;
  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute(userDTO: ICreateUserDTO): Promise<User> {
    const userToCreate = this.makeUserModel(userDTO);

    const userExists = await this.userRepository.findByEmail(userToCreate.email);
    if (userExists) {
      throw new AppError('User already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(userToCreate.password);
    return await this.userRepository.create(
      Object.assign(userToCreate, { password: hashedPassword }),
    );
  }

  private makeUserModel(user: ICreateUserDTO): User {
    return new User(user, 'create');
  }
}
