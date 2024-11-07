import { SelectMonthAndYear, SEO, LayoutBox } from '@/components';

import { useDashboard } from './hooks/useDashboard';
import { Summary } from './components/Summary';
import { ExpensesTable } from './components/ExpensesTable';
import { GoToCurrentMonthAndYearButton, HomeContainer } from './Home.styles';

export default function HomePage() {
	const { fetchSummaryExpenses, handleRestoreToCurrentMonthAndYear, deleteExpense, fetchExpenses } = useDashboard();

	return (
		<>
			<SEO title="Despesas do mês" description="Consolidado mensal de despesas" />
			<HomeContainer>
				<Summary fetchSummary={fetchSummaryExpenses} />
				<LayoutBox>
					<LayoutBox.Header>
						<LayoutBox.HeaderTitle>Despesas</LayoutBox.HeaderTitle>
						<LayoutBox.HeaderButtonsContainer>
							<GoToCurrentMonthAndYearButton type="button" onClick={handleRestoreToCurrentMonthAndYear}>
								Mês atual
							</GoToCurrentMonthAndYearButton>
							<SelectMonthAndYear />
						</LayoutBox.HeaderButtonsContainer>
					</LayoutBox.Header>
					<LayoutBox.Content>
						<ExpensesTable fetchExpenses={fetchExpenses} deleteExpense={deleteExpense} />
					</LayoutBox.Content>
				</LayoutBox>
			</HomeContainer>
		</>
	);
}
