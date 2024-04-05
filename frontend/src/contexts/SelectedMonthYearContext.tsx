import { useEffect, useMemo, useState } from 'react';
import { getYear, getMonth } from 'date-fns';
import { createContext } from 'use-context-selector';

export interface ISelectedMonthYearContextData {
	month: number;
	year: number;
	handleSelectMonthAndYear: (month: number, year?: number) => void;
	handleRestoreToCurrentMonthAndYear: () => void;
}

export const selectedMonthYearContext =
	createContext<ISelectedMonthYearContextData>(
		{} as ISelectedMonthYearContextData,
	);

const defaultMonth = getMonth(new Date());
const defaultYear = getYear(new Date());

export function SelectedMonthYearProvider({
	children,
}: Readonly<React.PropsWithChildren<{}>>) {
	const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
	const [selectedYear, setSelectedYear] = useState(defaultYear);

	function handleSelectMonthAndYear(month: number, year?: number) {
		setSelectedMonth(month);
		if (year) setSelectedYear(year);
	}

	function saveToLocalStorage() {
		if (!window?.localStorage) return;

		localStorage.setItem(
			`${
				process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''
			}-last-selected-month`,
			String(selectedMonth),
		);
		localStorage.setItem(
			`${
				process.env.NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY ?? ''
			}-last-selected-year`,
			String(selectedYear),
		);
	}

	function handleRestoreToCurrentMonthAndYear() {
		setSelectedMonth(defaultMonth);
		setSelectedYear(defaultYear);
	}

	function retrieveLastSelectedMonthAndYear() {
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
			setSelectedMonth(Number(lastSelectedMonth));
			setSelectedYear(Number(lastSelectedYear));
		}
	}

	/** Effect responsável por carregar a última seleção de mês e ano no local storage e salvar no estado. */
	useEffect(() => {
		retrieveLastSelectedMonthAndYear();
	}, []);

	/** Effect responsável por salvar a seleção de mês e ano no local storage. */
	useEffect(() => {
		saveToLocalStorage();
	}, [selectedMonth, selectedYear]);

	const providerValueMemoized = useMemo<ISelectedMonthYearContextData>(
		() => ({
			month: selectedMonth,
			year: selectedYear,
			handleSelectMonthAndYear,
			handleRestoreToCurrentMonthAndYear,
		}),
		[selectedMonth, selectedYear],
	);

	return (
		<selectedMonthYearContext.Provider value={providerValueMemoized}>
			{children}
		</selectedMonthYearContext.Provider>
	);
}
