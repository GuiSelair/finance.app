import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

interface IAuthenticateResponse {
  token: string;
}

@injectable()
class AuthenticateUserService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const comparePasswords = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!comparePasswords)
      throw new AppError('Incorrect email/password combination', 401);

    const token = sign(
      {
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
        subject: user.id,
      },
    );

    return {
      token,
    };
  }
}

export default AuthenticateUserService;
