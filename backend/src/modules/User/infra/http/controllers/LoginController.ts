import { Response, Request, NextFunction } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

class LoginController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);
    const user = await authenticateUserService.execute({
      email,
      password,
    });
    return response.status(200).json(user);
  }
}

export default LoginController;
