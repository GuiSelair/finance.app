import { useCallback, useEffect, useState } from 'react';

import ExpensesTable from '@/components/pages/home/ExpensesTable';
import { SelectMonthAndYear } from '@/components/pages/home/SelectMonthAndYear';
import { Summary } from '@/components/pages/home/Summary';

import {
	GoToCurrentMonthAndYearButton,
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

	function saveMonthAndYearSelectedToLocalStorage(month: string, year: string) {
		if (!window?.localStorage) return;

		localStorage.setItem(
			`${
				process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''
			}-last-selected-month`,
			month,
		);
		localStorage.setItem(
			`${
				process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''
			}-last-selected-year`,
			year,
		);
	}

	const handleGoToCurrentMonth = () => {
		setSelectedMonthAndYear(currentMonthAndYear);
		saveMonthAndYearSelectedToLocalStorage(
			String(currentMonthAndYear.month),
			String(currentMonthAndYear.year),
		);
	};

	useEffect(() => {
		function restoreLastMonthAndYearSelected() {
			const lastSelectedMonth = localStorage.getItem(
				`${
					process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''
				}-last-selected-month`,
			);

			const lastSelectedYear = localStorage.getItem(
				`${
					process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''
				}-last-selected-year`,
			);

			if (lastSelectedMonth && lastSelectedYear) {
				return setSelectedMonthAndYear({
					month: Number(lastSelectedMonth),
					year: Number(lastSelectedYear),
				});
			}
		}

		restoreLastMonthAndYearSelected();
	}, []);

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
						<GoToCurrentMonthAndYearButton
							type="button"
							onClick={handleGoToCurrentMonth}
						>
							Mês atual
						</GoToCurrentMonthAndYearButton>
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
