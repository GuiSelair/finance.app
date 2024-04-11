import { useEffect } from 'react';
import { Coins, CoinVertical, Wallet } from 'phosphor-react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { SummaryCard } from '../SummaryCard';
import { httpClient } from '@/providers/HTTPClient';
import { Spinner } from '@/components/Spinner';

import { Container } from './Summary.styles';

interface MonthBalanceProps {
	economy: number;
	totalOfExpenses: number;
	totalPayable: number;
}

interface SummaryProps {
	month: number;
	year: number;
}

export default function Summary({ month, year }: SummaryProps) {
	const {
		data,
		refetch,
		isLoading: isFetchingSummary,
	} = useQuery(['summary', month, year], async () => {
		try {
			const response = await httpClient.get<MonthBalanceProps>(
				'/expenses/balance',
				{
					params: {
						month,
						year,
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

	useEffect(() => {
		refetch();
	}, [month, year]); // eslint-disable-line

	return (
		<Container>
			<SummaryCard
				title="Total de gastos"
				value={data?.totalOfExpenses ?? 0}
				icon={() =>
					isFetchingSummary ? (
						<Spinner size="sm" mode="dark" />
					) : (
						<Coins size={24} />
					)
				}
			/>
			<SummaryCard
				title="Total a pagar"
				value={data?.totalPayable ?? 0}
				icon={() =>
					isFetchingSummary ? (
						<Spinner size="sm" mode="dark" />
					) : (
						<CoinVertical size={24} />
					)
				}
				variant="error"
			/>
			<SummaryCard
				title="Economia"
				value={data?.economy ?? 0}
				variant="success"
				icon={() =>
					isFetchingSummary ? (
						<Spinner size="sm" mode="dark" />
					) : (
						<Wallet size={24} />
					)
				}
			/>
		</Container>
	);
}
