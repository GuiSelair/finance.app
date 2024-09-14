import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import IHashProvider from '@providers/HashProvider/models/IHashProvider';
import AppError from '@errors/AppError';
import { IUsersRepository } from '@modules/User/domain/repositories/IUsersRepository';
import { env } from 'process';

interface ISignInDTO {
  email: string;
  password: string;
}

interface ISignInServiceOutput {
  token: string;
}

@injectable()
export class SignInService {
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

  public async execute({ email, password }: ISignInDTO): Promise<ISignInServiceOutput> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const comparePasswords = await this.hashProvider.compareHash(password, user.password);
    if (!comparePasswords) throw new AppError('Incorrect email/password combination', 401);

    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRE_IN ?? '1d';
    if (!jwtSecret) throw new AppError('Error in token secret', 401);

    const token = sign(
      {
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiresIn,
        subject: user.id,
      },
    );

    return {
      token,
    };
  }
}
