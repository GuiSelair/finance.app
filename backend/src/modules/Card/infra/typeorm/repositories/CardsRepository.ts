import { Repository } from 'typeorm';
import { ConnectionSource } from '@shared/infra/typeorm/bootstrap';

import ICreateCard from '../../../dtos/ICreateCard';
import ICardRepository from '../../../repositories/ICardRepository';
import Card from '../entities/Card';

class CardsRepository implements ICardRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = ConnectionSource.getRepository(Card);
  }

  public async create({
    name,
    due_day,
    flag,
    user_id,
    turning_day,
  }: ICreateCard): Promise<Card> {
    const newCard = this.repository.create({
      name,
      due_day,
      flag,
      user_id,
      turning_day,
    });

    await this.repository.save(newCard);

    return newCard;
  }

  public async findByName(name: string): Promise<Card | null> {
    const cardFound = await this.repository.findOne({
      where: {
        name,
      },
    });

    return cardFound;
  }

  public async findById(id: string): Promise<Card | null> {
    const cardFound = await this.repository.findOne({
      where: {
        id,
      },
    });

    return cardFound;
  }

  public async fetchAll(userId: string): Promise<Card[] | null> {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }

  public async fetch(userId: string): Promise<Card[] | undefined> {
    return this.repository.find({
      where: {
        user_id: userId,
      },
    });
  }
}

export default CardsRepository;
