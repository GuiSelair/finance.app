import { Response, Request, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateCardService from '../../../services/CreateCardService';

class CardsController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { due_day, name, flag, turning_day } = request.body;
    const { id } = request.user;
    const createCardService = container.resolve(CreateCardService);
    const card = await createCardService.execute({
      due_day,
      flag,
      name,
      user_id: id,
      turning_day,
    });
    return response.status(201).json(card);
  }
}

export default CardsController;
