import { Repository } from 'typeorm';

import { DataSourceConfiguration } from '@shared/infra/typeorm/bootstrap';
import { ICardsRepository } from '@modules/Card/domain/repositories/ICardsRepository';
import { Card } from '@modules/Card/domain/models/Card';
import { CardMapper } from '../entities/CardMapper';

export class CardsRepository implements ICardsRepository {
  private repository: Repository<CardMapper>;

  constructor() {
    this.repository = DataSourceConfiguration.getRepository(CardMapper);
  }

  public async create({ name, due_day, flag, user_id, turning_day }: Card): Promise<CardMapper> {
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

  public async findByName(name: string, user_id: string): Promise<CardMapper | null> {
    const cardFound = await this.repository.findOne({
      where: {
        name,
        user_id,
      },
    });

    return cardFound;
  }

  public async findById(id: string, user_id: string): Promise<CardMapper | null> {
    const cardFound = await this.repository.findOne({
      where: {
        id,
        user_id,
      },
    });

    return cardFound;
  }

  public async fetch(user_id: string): Promise<CardMapper[] | undefined> {
    return this.repository.find({
      where: {
        user_id,
      },
    });
  }
}
