import ICreateCard from '../dtos/ICreateCard';
import Card from '../infra/typeorm/entities/Card';

export default interface ICardRepository {
  create(data: ICreateCard): Promise<Card>;
  findByName(name: string): Promise<Card | undefined>;
  findById(id: string): Promise<Card | undefined>;
  findByUserId(userId: string): Promise<Card[] | undefined>;
  fetch(userId: string): Promise<Card[] | undefined>;
}
