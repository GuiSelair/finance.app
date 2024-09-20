import uuid from 'uuid';

import { CardMapper } from '@modules/Card/infra/typeorm/entities/CardMapper';
import { ICardsRepository } from '../ICardsRepository';
import { Card } from '../../models/Card';

export class FakeCardsRepository implements ICardsRepository {
  private repository: CardMapper[] = [];

  public async create(card: Card): Promise<CardMapper> {
    const cardMapper = new CardMapper();
    Object.assign(cardMapper, {
      id: uuid.v4(),
      name: card.name,
      due_day: card.due_day,
      turning_day: card.turning_day,
      flag: card.flag,
      user_id: card.flag,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.repository.push(cardMapper);

    return cardMapper;
  }

  public async findByName(name: string, user_id: string): Promise<CardMapper | null> {
    const cardFound = this.repository.find(card => card.name === name && card.user_id === user_id);

    return cardFound || null;
  }

  public async findById(id: string, user_id: string): Promise<CardMapper | null> {
    const cardFound = this.repository.find(card => card.id === id && card.user_id === user_id);

    return cardFound || null;
  }

  public async fetch(user_id: string): Promise<CardMapper[] | undefined> {
    return this.repository.filter(card => card.user_id === user_id) || null;
  }
}
