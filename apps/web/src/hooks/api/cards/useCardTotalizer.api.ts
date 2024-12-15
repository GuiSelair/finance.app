import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';
import { makeCardModel, RawCard } from '@/helpers/mappers/makeCardModel';

interface IFetchCardTotalizerParams {
	month: number;
	year: number;
}

export const useCardTotalizerApi = ({ month, year }: IFetchCardTotalizerParams) =>
	useQuery(
		['cardTotalizer', month, year],
		async () => {
			const apiResponse = await httpClient.get<RawCard[]>('/cards/totalizers', {
				params: {
					month,
					year,
				},
			});

			return apiResponse.data.map(rawCard => makeCardModel(rawCard));
		},
		{
			onError: () => {
				toast.error('Erro ao buscar resumo por cartões. Atualize a página e tente novamente.');
			},
			refetchOnWindowFocus: false,
			retryDelay: 5000,
			retry(failureCount) {
				return failureCount < 2;
			},
		},
	);
