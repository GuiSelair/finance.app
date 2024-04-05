import { ExpensesTable } from './components/ExpensesTable';
import { SelectMonthAndYear } from '@/components/SelectMonthAndYear';
import { Summary } from './components/Summary';
import { SEO } from '@/components/SEO';
import { LayoutBox } from '@/components/LayoutBox';

import { useDashboard } from './hooks/useDashboard';
import { GoToCurrentMonthAndYearButton, HomeContainer } from './Home.styles';

export default function HomePage() {
	const {
		handleRestoreToCurrentMonthAndYear,
		handleSelectMonthAndYear,
		month,
		year,
	} = useDashboard();

	return (
		<>
			<SEO
				title="Despesas do mês"
				description="Consolidado mensal de despesas"
			/>
			<HomeContainer>
				<Summary month={month} year={year} />
				<LayoutBox>
					<LayoutBox.Header>
						<LayoutBox.HeaderTitle>Despesas</LayoutBox.HeaderTitle>
						<LayoutBox.HeaderButtonsContainer>
							<GoToCurrentMonthAndYearButton
								type="button"
								onClick={handleRestoreToCurrentMonthAndYear}
							>
								Mês atual
							</GoToCurrentMonthAndYearButton>
							<SelectMonthAndYear
								month={month}
								year={year}
								onSelectMonthAndYear={handleSelectMonthAndYear}
							/>
						</LayoutBox.HeaderButtonsContainer>
					</LayoutBox.Header>
					<LayoutBox.Content>
						<ExpensesTable month={month} year={year} />
					</LayoutBox.Content>
				</LayoutBox>
			</HomeContainer>
		</>
	);
}
