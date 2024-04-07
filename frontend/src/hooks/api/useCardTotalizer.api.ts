import { CardService } from '@/services/http/cardService';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

interface IUseFetchCardTotalizer {
	month: number;
	year: number;
}

export const useCardTotalizerApi = ({ month, year }: IUseFetchCardTotalizer) =>
	useQuery(
		['cardTotalizer', month, year],
		async () => {
			return CardService.fetchCardTotalizer({
				month,
				year,
			});
		},
		{
			onError: () => {
				toast.error(
					'Erro ao buscar resumo por cartões. Atualize a página e tente novamente.',
				);
			},
			refetchOnWindowFocus: false,
			retryDelay: 5000,
			retry(failureCount) {
				return failureCount < 2;
			},
		},
	);
