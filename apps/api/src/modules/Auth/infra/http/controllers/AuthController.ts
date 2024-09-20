import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { SignInService } from '@modules/Auth/domain/services/SignInService';
import { requestValidations } from '@helpers/requestValidations';

export class AuthController {
  public async signIn(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.body, 'email');
    requestValidations.throwIfPropertyNotExists(request.body, 'password');

    const signInService = container.resolve(SignInService);
    const user = await signInService.execute(request.body);
    return response.status(200).json(user);
  }
}
