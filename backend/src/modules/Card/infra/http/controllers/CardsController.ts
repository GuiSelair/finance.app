import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { requestValidations } from '@helpers/requestValidations';

import { CreateCardService } from '@modules/Card/domain/services/CreateCardService';
import { CardSummaryService } from '@modules/Card/domain/services/CardTotalizerService';
import { FetchCardsService } from '@modules/Card/domain/services/FetchCardsService';

export class CardsController {
  public async create(request: Request, response: Response) {
    requestValidations.throwIfEmptyBody(request.body);

    const { due_day, name, flag, turning_day } = request.body;
    const { id } = request.user;

    const createCardService = container.resolve(CreateCardService);
    const card = await createCardService.execute({
      due_day,
      flag,
      name,
      turning_day,
      user_id: id,
    });

    return response.status(201).json(card);
  }

  public async summary(request: Request, response: Response) {
    requestValidations.throwIfPropertyNotExists(request.query, 'month');
    requestValidations.throwIfPropertyNotExists(request.query, 'year');

    const { month, year } = request.query;
    const { id } = request.user;

    requestValidations.throwIfPropertyMonthIsNotValid(Number(month));
    requestValidations.throwIfPropertyYearIsNotValid(Number(year));

    const cardSummaryService = container.resolve(CardSummaryService);
    const summary = await cardSummaryService.execute({
      month: Number(month),
      year: Number(year),
      user_id: id,
    });

    return response.status(200).json(summary);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.user;

    const fetchCardsService = container.resolve(FetchCardsService);
    const cardsList = await fetchCardsService.execute({
      user_id: id,
    });

    return response.status(200).json(cardsList);
  }
}
