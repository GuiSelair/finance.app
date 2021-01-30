import { Response, Request, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';

class UsersController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      email,
      name,
      password,
    });
    return response.status(201).json(user);
  }
}

export default UsersController;
