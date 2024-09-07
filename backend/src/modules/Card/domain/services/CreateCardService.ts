import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { CardMapper } from '@modules/Card/infra/typeorm/entities/Card';
import { ICardRepository } from '../repositories/ICardRepository';

interface ICreateCardDTO {
  name: string;
  flag: string;
  due_day: number;
  turning_day: number;
  user_id: string;
}

@injectable()
class CreateCardService {
  private cardRepository: ICardRepository;

  constructor(
    @inject('CardRepository')
    cardRepository: ICardRepository,
  ) {
    this.cardRepository = cardRepository;
  }

  public async execute({
    name,
    due_day,
    flag,
    user_id,
    turning_day,
  }: ICreateCardDTO): Promise<Card> {
    const card = await this.cardRepository.findByName(name);
    if (card) throw new AppError('Impossible create two cards with same name');

    const newCard = await this.cardRepository.create({
      due_day,
      flag,
      name,
      user_id,
      turning_day,
    });

    return newCard;
  }
}

export default CreateCardService;
