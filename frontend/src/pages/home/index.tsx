import { useCallback, useEffect, useState } from 'react';

import ExpensesTable from '@/pages/home/components/ExpensesTable';
import { SelectMonthAndYear } from '@/components/SelectMonthAndYear';
import { Summary } from './components/Summary';
import { SEO } from '@/components/SEO';
import { LayoutBox } from '@/components/LayoutBox';

import { GoToCurrentMonthAndYearButton, HomeContainer } from './styles';

export function HomePage(): JSX.Element {
	const currentMonthAndYear = {
		month: new Date().getMonth(),
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
		<>
			<SEO
				title="Despesas do mês"
				description="Consolidado mensal de despesas"
			/>
			<HomeContainer>
				<Summary
					month={selectedMonthAndYear.month}
					year={selectedMonthAndYear.year}
				/>
				<LayoutBox>
					<LayoutBox.Header>
						<LayoutBox.HeaderTitle>Despesas</LayoutBox.HeaderTitle>
						<LayoutBox.HeaderButtonsContainer>
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
						</LayoutBox.HeaderButtonsContainer>
					</LayoutBox.Header>
					<LayoutBox.Content>
						<ExpensesTable
							month={selectedMonthAndYear.month}
							year={selectedMonthAndYear.year}
						/>
					</LayoutBox.Content>
				</LayoutBox>
			</HomeContainer>
		</>
	);
}
