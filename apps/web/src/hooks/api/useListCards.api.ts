import { useQuery } from 'react-query';
import { transformToCamelCase } from '@finance-app/helpers';

import { Card, CardProps } from '@/models/Card';
import { httpClient } from '@/providers/HTTPClient';
import { toast } from 'react-toastify';

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
