import type { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateUserService, ICreateUserDTO } from '@modules/User/domain/services/CreateUserService';
import { requestValidations } from '@helpers/requestValidations';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const body = request.body;
    requestValidations.throwIfEmptyBody(body);

    const createUserService = container.resolve(CreateUserService);
    const userCreated = await createUserService.execute(body as ICreateUserDTO);

    return response.status(201).json(userCreated);
  }
}
