import { useContextSelector } from 'use-context-selector';
import { getYear } from 'date-fns';

import { Select, SelectOptionProps } from '@/components/Form/Select';
import { getMonthOption, getMonthOptions } from '@/helpers/monthOptions';
import { getYearOptions } from '@/helpers/yearOptions';
import { selectedMonthYearContext, AuthContext } from '@/contexts';

import { SelectMonthAndYearContainer } from './SelectMonthAndYear.styles';

export function SelectMonthAndYear() {
	const userCreatedAt = useContextSelector(
		AuthContext,
		ctx => ctx.user.createdAt,
	);
	const {
		month: selectedMonth,
		year: selectedYear,
		handleSelectMonthAndYear,
	} = useContextSelector(selectedMonthYearContext, ctx => ctx);

	if (!userCreatedAt || typeof selectedMonth === 'undefined') return null;

	const monthOptions = getMonthOptions();
	const currentMonthOption = getMonthOption(selectedMonth);

	const yearOptions = getYearOptions(getYear(userCreatedAt) ?? 2022);
	const currentYearOption = yearOptions.find(
		yearOption => Number(yearOption.value) === selectedYear,
	);

	function handleSelectMonth(option: SelectOptionProps) {
		handleSelectMonthAndYear(Number(option.value));
	}

	function handleSelectYear(option: SelectOptionProps) {
		handleSelectMonthAndYear(selectedMonth, Number(option.value));
	}

	return (
		<SelectMonthAndYearContainer>
			<Select
				options={monthOptions}
				value={currentMonthOption}
				placeholder="Mês"
				isClearable={false}
				noOptionsMessage={() => 'Mês não encontrado'}
				width="150px"
				onChange={newValue => handleSelectMonth(newValue as SelectOptionProps)}
			/>
			<Select
				options={yearOptions}
				value={currentYearOption}
				placeholder="Ano"
				isClearable={false}
				noOptionsMessage={() => 'Ano não encontrado'}
				onChange={newValue => handleSelectYear(newValue as SelectOptionProps)}
			/>
		</SelectMonthAndYearContainer>
	);
}
