import Card from '../infra/typeorm/entities/Card';

export interface IFetchCardsRequest {
  userId: string;
}

export interface IFetchCardsResponse {
  cards: Card[] | undefined;
}
