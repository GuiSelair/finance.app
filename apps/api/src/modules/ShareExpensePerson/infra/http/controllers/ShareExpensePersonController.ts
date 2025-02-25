import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import { requestValidations } from '@helpers/requestValidations';
import { CreateShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/CreateShareExpensePersonService'
import { FetchShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/FetchShareExpensePersonService';

export class ShareExpensePersonController {
  public async create(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfEmptyBody(request.body);
    const { id } = request.user;

    const createShareExpensePersonService = container.resolve(CreateShareExpensePersonService);

    const shareExpensePerson = await createShareExpensePersonService.execute({
      ...request.body,
      user_id: id,
    });

    return response.status(201).json(shareExpensePerson);
  }

  public async fetch(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const fetchShareExpensePersonService = container.resolve(FetchShareExpensePersonService);
    const shareExpensePerson = await fetchShareExpensePersonService.execute({ user_id: id });

    return response.status(200).json(shareExpensePerson);
  }
}
