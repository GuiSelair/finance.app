import { Coins, CoinVertical, Wallet } from 'phosphor-react';
import { useQuery } from 'react-query';
import { httpClient } from '@/providers/HTTPClient';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import SummaryCard from '@/components/pages/home/SummaryCard';
import { Container } from './styles';

interface MonthBalanceProps {
	economy: number;
	totalOfExpenses: number;
	totalPayable: number;
}

export const Summary = () => {
	const { data, isFetching } = useQuery(['summary'], async () => {
		try {
			const response = await httpClient.get<MonthBalanceProps>(
				'/expenses/balance',
				{
					params: {
						month: 10,
						year: 2022,
					},
				},
			);

			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorFromServer = error.response?.data;

				toast.error(
					'Aconteceu um erro inesperado. Por favor, tente novamente...',
					{
						position: 'bottom-left',
						theme: 'colored',
					},
				);
				throw new Error(errorFromServer.error);
			}
		}
	});

	if (isFetching) {
		return <p>Carregando...</p>;
	}

	return (
		<Container>
			<SummaryCard
				title="Total de gastos"
				value={data?.totalOfExpenses ?? 0}
				icon={() => <Coins size={24} />}
			/>
			<SummaryCard
				title="Total a pagar"
				value={data?.totalPayable ?? 0}
				icon={() => <CoinVertical size={24} />}
				variant="error"
			/>
			<SummaryCard
				title="Economia"
				value={data?.economy ?? 0}
				variant="success"
				icon={() => <Wallet size={24} />}
			/>
		</Container>
	);
};
