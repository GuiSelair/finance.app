import ExpensesTable from '@/components/pages/home/ExpensesTable';
import { Summary } from '@/components/pages/home/Summary';

import { HomeContainer, ListExpenses } from '@/styles/pages/home.style';

export default function Home(): JSX.Element {
	return (
		<HomeContainer>
			<Summary />
			<ListExpenses>
				<header>
					<div>
						<h2>Despesas</h2>
					</div>
					<div></div>
				</header>

				<ExpensesTable />
			</ListExpenses>
		</HomeContainer>
	);
}
