import SummaryCard from '@/components/pages/home/SummaryCard';
import { HomeContainer } from '@/styles/pages/home.style';
import { Coins, CoinVertical, Wallet } from 'phosphor-react';

export default function Home(): JSX.Element {
	return (
		<HomeContainer>
			<div>
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
			</div>
		</HomeContainer>
	);
}
