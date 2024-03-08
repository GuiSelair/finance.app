import { inject, injectable } from 'tsyringe';

import ICardRepository from '../repositories/ICardRepository';
import Card from '../infra/typeorm/entities/Card';

export interface IFetchCardsParams {
  userId: string;
}

export interface IFetchCardsReturn {
  cards: Card[];
}

@injectable()
class FetchCardsService{
  private cardRepository: ICardRepository;

  constructor(
    @inject('CardRepository')
    cardRepository: ICardRepository
  ){
    this.cardRepository = cardRepository;
  }

  public async execute({ userId }: IFetchCardsParams): Promise<IFetchCardsReturn> {
    const cards = await this.cardRepository.fetchAll(userId);

    return {
      cards: cards ?? []
    }
  }
}

export default FetchCardsService;
