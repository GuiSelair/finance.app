export interface ICardTotalizer {
  cardId: string;
  cardName: string;
  total: number;
}

export interface IGetCardTotalizer {
  month: number;
  year: number;
  userId: string;
}
