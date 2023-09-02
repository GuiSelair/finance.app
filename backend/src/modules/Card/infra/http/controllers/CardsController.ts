import { Response, Request, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateCardService from '../../../services/CreateCardService';
import CardTotalizerService from '../../../services/CardTotalizerService';
import FetchCardsService from '../../../services/FetchCardsService';

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

  public async getTotalizers(request: Request, response: Response) {
    const { month, year } = request.query;
    const { id } = request.user;

    const cardTotalizerService = container.resolve(CardTotalizerService);

    const totalizers = await cardTotalizerService.execute({
      month: Number(month),
      year: Number(year),
      userId: id,
    });

    return response.status(200).json(totalizers);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.user;

    const fetchCardsService = container.resolve(FetchCardsService);

    const cardsList = await fetchCardsService.execute({
      userId: id,
    });

    return response.status(200).json(cardsList);
  }
}

export default CardsController;
