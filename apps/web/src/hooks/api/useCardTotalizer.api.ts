import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { httpClient } from '@/providers/HTTPClient';

interface IFetchCardTotalizerParams {
	month: number;
	year: number;
}

interface IFetchCardTotalizerReturn {
	id: string;
	name: string;
	turningDay: number;
	total: number;
}

export const useCardTotalizerApi = ({ month, year }: IFetchCardTotalizerParams) =>
	useQuery(
		['cardTotalizer', month, year],
		async () => {
			const apiResponse = await httpClient.get<IFetchCardTotalizerReturn[]>('/cards/totalizers', {
				params: {
					month,
					year,
				},
			});

			const data = apiResponse.data;
			return data;
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
