import { v4 as createUUID } from 'uuid';

import ICreateCard from '../../dtos/ICreateCard';
import ICardRepository from '../ICardRepository';
import Card from '../../infra/typeorm/entities/Card';

class CardsRepository implements ICardRepository {
  private repository: Card[] = [];

  public async create({
    name,
    due_day,
    flag,
    user_id,
    turning_day,
  }: ICreateCard): Promise<Card> {
    const card = new Card();
    Object.assign(card, {
      id: createUUID(),
      name,
      due_day,
      turning_day,
      flag,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.repository.push(card);

    return card;
  }

  public async findByName(name: string): Promise<Card | undefined> {
    const cardFound = this.repository.find(card => card.name === name);

    return cardFound;
  }

  public async findById(id: string): Promise<Card | undefined> {
    const cardFound = this.repository.find(card => card.id === id);

    return cardFound;
  }
}

export default CardsRepository;
