import { useCallback, useState } from 'react';

import ExpensesTable from '@/components/pages/home/ExpensesTable';
import { SelectMonthAndYear } from '@/components/pages/home/SelectMonthAndYear';
import { Summary } from '@/components/pages/home/Summary';

import {
	HomeContainer,
	ListExpensesContainer,
	ListExpensesHeader,
} from '@/styles/pages/home.style';

export default function Home(): JSX.Element {
	const currentMonthAndYear = {
		month: new Date().getMonth() + 1,
		year: new Date().getFullYear(),
	};

	const [selectedMonthAndYear, setSelectedMonthAndYear] =
		useState(currentMonthAndYear);

	const handleSelectMonthAndYear = useCallback(
		(selectedMonth?: number, selectedYear?: number) => {
			setSelectedMonthAndYear(old => ({
				month: selectedMonth ?? old.month,
				year: selectedYear ?? old.year,
			}));
		},
		[],
	);

	return (
		<HomeContainer>
			<Summary
				month={selectedMonthAndYear.month}
				year={selectedMonthAndYear.year}
			/>
			<ListExpensesContainer>
				<ListExpensesHeader>
					<div>
						<h2>Despesas</h2>
					</div>
					<div>
						<SelectMonthAndYear
							month={selectedMonthAndYear.month}
							year={selectedMonthAndYear.year}
							onSelectMonthAndYear={handleSelectMonthAndYear}
						/>
					</div>
				</ListExpensesHeader>

				<ExpensesTable
					month={selectedMonthAndYear.month}
					year={selectedMonthAndYear.year}
				/>
			</ListExpensesContainer>
		</HomeContainer>
	);
}
