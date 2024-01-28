import { inject, injectable } from 'tsyringe';

import ICardRepository from '../repositories/ICardRepository';
import { IFetchCardsRequest, IFetchCardsResponse } from '../dtos/IFetchCards';

@injectable()
class FetchCardsService{
  private cardRepository: ICardRepository;

  constructor(
    @inject('CardRepository')
    cardRepository: ICardRepository
  ){
    this.cardRepository = cardRepository;
  }

  public async execute({ userId }: IFetchCardsRequest): Promise<IFetchCardsResponse> {
    const cards = await this.cardRepository.fetchAll(userId);

    return {
      cards: cards ?? []
    }
  }
}

export default FetchCardsService;
