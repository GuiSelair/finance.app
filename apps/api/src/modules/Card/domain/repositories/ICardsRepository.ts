import { CardMapper } from '../../infra/typeorm/entities/CardMapper';
import { Card } from '../models/Card';

export interface ICardsRepository {
  create(data: Card): Promise<CardMapper>;
  findByName(name: string, user_id: string): Promise<CardMapper | null>;
  findById(id: string, user_id: string): Promise<CardMapper | null>;
  fetch(user_id: string): Promise<CardMapper[] | undefined>;
}
