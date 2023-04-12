import { useContextSelector } from 'use-context-selector';

import { Select } from '@/components/shared/Form/Select';
import { getMonths, getMonth } from '@/helpers/getMonths';
import { getYears } from '@/helpers/getYears';
import { AuthContext } from '@/contexts/AuthContext';

import { SelectMonthAndYearContainer } from './styles';

interface SelectMonthAndYearProps {
	month: number;
	year: number;
	onSelectMonthAndYear: (month?: number, year?: number) => void;
}

export function SelectMonthAndYear({
	month,
	year,
	onSelectMonthAndYear,
}: SelectMonthAndYearProps) {
	const userCreatedAt = useContextSelector(
		AuthContext,
		context => context.user.createdAt,
	);

	const months = getMonths();
	const currentMonthOption = getMonth(month);

	const years = getYears(userCreatedAt?.getFullYear() || 2022);
	const currentYearOption = years.find(yearOption => yearOption.value === year);

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

	function handleSelectMonth(monthSelected: any) {
		onSelectMonthAndYear(monthSelected?.value as number);
		saveMonthAndYearSelectedToLocalStorage(
			String(monthSelected?.value),
			String(year),
		);
	}

	function handleSelectYear(yearSelected: any) {
		onSelectMonthAndYear(undefined, yearSelected?.value as number);
		saveMonthAndYearSelectedToLocalStorage(
			String(month),
			String(yearSelected?.value),
		);
	}

	return (
		<SelectMonthAndYearContainer>
			<Select
				options={months}
				value={currentMonthOption}
				placeholder="Mês"
				isClearable={false}
				noOptionsMessage={() => 'Mês não encontrado'}
				width="150px"
				onChange={handleSelectMonth}
			/>
			<Select
				options={years}
				value={currentYearOption}
				placeholder="Ano"
				isClearable={false}
				noOptionsMessage={() => 'Ano não encontrado'}
				onChange={handleSelectYear}
			/>
		</SelectMonthAndYearContainer>
	);
}
