import ICreateCard from '../dtos/ICreateCard';
import Card from '../../infra/typeorm/entities/Card';

export default interface ICardRepository {
  create(data: ICreateCard): Promise<Card>;
  findByName(name: string): Promise<Card | null>;
  findById(id: string): Promise<Card | null>;
  fetchAll(userId: string): Promise<Card[] | null>;
}
