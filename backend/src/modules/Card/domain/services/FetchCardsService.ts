import { inject, injectable } from 'tsyringe';

import { ICardsRepository } from '../repositories/ICardsRepository';
import { Card } from '../models/Card';
import { CardMapper } from '@modules/Card/infra/typeorm/entities/Card';

export interface IFetchCardsDTO {
  user_id: string;
}

export interface IFetchCardsOutput {
  cards: Card[];
}

@injectable()
export class FetchCardsService {
  private cardsRepository: ICardsRepository;

  constructor(
    @inject('CardsRepository')
    cardsRepository: ICardsRepository,
  ) {
    this.cardsRepository = cardsRepository;
  }

  public async execute({ user_id }: IFetchCardsDTO): Promise<IFetchCardsOutput> {
    const cardsMapper = await this.cardsRepository.fetch(user_id);
    const cards = this.makeCardsModel(cardsMapper || []);

    return {
      cards,
    };
  }

  private makeCardsModel(cardsMapper: CardMapper[]) {
    return cardsMapper.map(cardMapper => new Card(cardMapper));
  }
}
