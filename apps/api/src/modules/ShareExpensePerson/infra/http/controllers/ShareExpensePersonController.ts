import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import { requestValidations } from '@helpers/requestValidations';
import { CreateShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/CreateShareExpensePersonService'
import { FetchShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/FetchShareExpensePersonService';
import { FindShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/FindShareExpensePersonService';
import { EditShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/EditShareExpensePersonService';
import { DisableShareExpensePersonService } from '@modules/ShareExpensePerson/domain/services/DisableShareExpensePersonService';

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

  public async edit(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfEmptyBody(request.body);
    requestValidations.throwIfIsNaN({ name: 'share person id', value: Number(request.params.id) });
    const { id } = request.user;
    const sharePersonId = Number(request.params.id)

    const editShareExpensePersonService = container.resolve(EditShareExpensePersonService);

    const shareExpensePerson = await editShareExpensePersonService.execute({
      ...request.body,
      id: sharePersonId,
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

  public async find(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.params, 'id')
    requestValidations.throwIfIsNaN({ name: 'id', value: Number(request.params.id) })

    const { id } = request.user;
    const sharePersonId = Number(request.params.id)

    const findShareExpensePersonService = container.resolve(FindShareExpensePersonService);
    const shareExpensePerson = await findShareExpensePersonService.execute({ id: sharePersonId, user_id: id });

    return response.status(200).json(shareExpensePerson);
  }

  public async disable(request: Request, response: Response): Promise<Response> {
    requestValidations.throwIfPropertyNotExists(request.params, 'id')
    requestValidations.throwIfIsNaN({ name: 'id', value: Number(request.params.id) })

    const { id } = request.user;
    const sharePersonId = Number(request.params.id)

    const disableShareExpensePersonService = container.resolve(DisableShareExpensePersonService);
    await disableShareExpensePersonService.execute({ id: sharePersonId, user_id: id });

    return response.status(204).send()
  }
}
