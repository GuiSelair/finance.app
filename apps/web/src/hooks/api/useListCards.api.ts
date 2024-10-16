import { useQuery } from 'react-query';
import { transformToCamelCase } from '@finance-app/helpers';

import { Card, CardProps } from '@/models/Card';
import { httpClient } from '@/providers/HTTPClient';
import { toast } from 'react-toastify';

export interface RawCard {
	id: string;
	user_id: string;
	name: string;
	flag: string;
	due_day: number;
	turning_day: number;
	created_at: string;
	updated_at: string;
}

export function useListCardsApi() {
	return useQuery(
		'payment-methods',
		async () => {
			const apiResponse = await httpClient.get<{ cards: CardProps[] }>(
				'/cards/list',
			);
			return apiResponse.data.cards.map(card => {
				const cardToCamelCase = transformToCamelCase<CardProps>(
					card,
				) as CardProps;
				return new Card({
					...cardToCamelCase,
				});
			});
		},
		{
			onError: () => {
				toast.error(
					'Ocorreu um erro ao carregar os meios de pagamento. Tente novamente mais tarde.',
				);
			},
		},
	);
}
