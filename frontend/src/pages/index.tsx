import {
	Coins,
	CoinVertical,
	Wallet,
	MagnifyingGlass,
	Funnel,
	ArrowCircleDown,
} from 'phosphor-react';

import SummaryCard from '@/components/pages/home/SummaryCard';
import Table from '@/components/shared/Table';
import { Input } from '@/components/shared/Form/Input';

import {
	HomeContainer,
	ListExpenses,
	Summary,
	FilterContainer,
	FilterButton,
} from '@/styles/pages/home.style';

export default function Home(): JSX.Element {
	return (
		<HomeContainer>
			<Summary>
				<SummaryCard
					title="Total de gastos"
					value={1800}
					icon={() => <Coins size={24} />}
				/>
				<SummaryCard
					title="Total a pagar"
					value={1532.25}
					icon={() => <CoinVertical size={24} />}
					variant="error"
				/>
				<SummaryCard
					title="Economia"
					value={320}
					variant="success"
					icon={() => <Wallet size={24} />}
				/>
			</Summary>
			<ListExpenses>
				<header>
					<div>
						<h2>Despesas</h2>
					</div>
					<div></div>
				</header>
				<FilterContainer>
					<Input icon={() => <MagnifyingGlass size={24} />} />
					<FilterButton>
						<Funnel size={24} />
						Filtros
					</FilterButton>
					<FilterButton>
						<ArrowCircleDown size={24} />
						Exportar
					</FilterButton>
				</FilterContainer>
				<Table />
			</ListExpenses>
		</HomeContainer>
	);
}
