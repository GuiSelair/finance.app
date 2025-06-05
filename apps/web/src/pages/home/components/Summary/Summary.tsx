import { Coins as CoinsIcon, CoinVertical as CoinVerticalIcon, Wallet as WalletIcon } from 'phosphor-react';

import { FormIncomePopover } from '../FormIncomePopover';
import { SummaryCard } from './components/SummaryCard';
import { SummaryContainer } from './Summary.styles';

export interface IExpensesSummary {
	economy: number;
	totalOfExpenses: number;
	totalPayable: number;
}

export interface IFetchSummaryResponse {
	summary?: IExpensesSummary;
	isLoading: boolean;
	isError: boolean;
}

interface ISummaryProps {
	fetchSummary: () => IFetchSummaryResponse;
}

export default function Summary({ fetchSummary }: Readonly<ISummaryProps>) {
	const { summary, isLoading: isFetchingSummary } = fetchSummary();

	const totalOfExpenses = summary?.totalOfExpenses ?? 0;
	const totalPayable = summary?.totalPayable ?? 0;
	const economy = summary?.economy ?? 0;

	return (
		<SummaryContainer>
			<SummaryCard
				title="Total de gastos"
				value={totalOfExpenses}
				icon={<CoinsIcon size={24} />}
				isLoading={isFetchingSummary}
			/>
			<SummaryCard
				title="Total a pagar"
				value={totalPayable}
				variant="error"
				icon={<CoinVerticalIcon size={24} />}
				isLoading={isFetchingSummary}
			/>
			<SummaryCard
				title="Economia"
				value={economy}
				variant="success"
				icon={<WalletIcon size={24} />}
				isLoading={isFetchingSummary}
				optionsComponent={<FormIncomePopover />}
			/>
		</SummaryContainer>
	);
}
