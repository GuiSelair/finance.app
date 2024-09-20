import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICardsRepository } from '../repositories/ICardsRepository';
import { Card } from '../models/Card';

interface ICreateCardDTO {
  name: string;
  flag: string;
  due_day: number;
  turning_day: number;
  user_id: string;
}

@injectable()
export class CreateCardService {
  private cardsRepository: ICardsRepository;

  constructor(
    @inject('CardsRepository')
    cardRepository: ICardsRepository,
  ) {
    this.cardsRepository = cardRepository;
  }

  public async execute(cardDTO: ICreateCardDTO) {
    const cardToCreate = this.makeCardModel(cardDTO);

    const cardFounded = await this.cardsRepository.findByName(
      cardToCreate.name!,
      cardToCreate.user_id!,
    );
    if (cardFounded) throw new AppError('Impossible create two cards with same name');

    return await this.cardsRepository.create(cardToCreate);
  }

  private makeCardModel(card: ICreateCardDTO) {
    return new Card(card, 'create');
  }
}
