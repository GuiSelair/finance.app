import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';
import { makeCardModel, RawCard } from '@/helpers/mappers/makeCardModel';

export function useListCardsApi() {
	return useQuery(
		'payment-methods',
		async () => {
			const apiResponse = await httpClient.get<{ cards: RawCard[] }>('/cards/list');
			return apiResponse.data.cards.map(card => makeCardModel(card));
		},
		{
			onError: () => {
				toast.error('Ocorreu um erro ao carregar os meios de pagamento. Tente novamente mais tarde.');
			},
		},
	);
}
