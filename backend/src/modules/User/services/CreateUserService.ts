import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  private userRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository,
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ email, name, password }: IRequestDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      throw new Error('User already exists...');
    }

    const newUser = await this.userRepository.create({
      email,
      name,
      password,
    });

    return newUser;
  }
}

export default CreateUserService;
