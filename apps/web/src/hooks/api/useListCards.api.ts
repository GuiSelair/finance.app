import { useQuery } from 'react-query';

import { Card } from '@/models/Card';
import { httpClient } from '@/providers/HTTPClient';
import { toast } from 'react-toastify';

export function useListCardsApi() {
	return useQuery(
		'payment-methods',
		async () => {
			const apiResponse = await httpClient.get<{ cards: Card[] }>(
				'/cards/list',
			);
			return apiResponse.data.cards;
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
