import { useContextSelector } from 'use-context-selector';
import { useMemo } from 'react';

import { Select, SelectOptionProps } from '@/components/Form/Select';
import { getMonthOption, getMonthOptions } from '@/helpers/monthOptions';
import { getYearOptions } from '@/helpers/yearOptions';
import { selectedMonthYearContext, AuthContext } from '@/contexts';

import { SelectMonthAndYearContainer } from './SelectMonthAndYear.styles';

export function SelectMonthAndYear() {
	const userCreatedAt = useContextSelector(AuthContext, ctx => ctx.user.createdAt);
	const {
		month: selectedMonth,
		year: selectedYear,
		handleSelectMonthAndYear,
	} = useContextSelector(selectedMonthYearContext, ctx => ctx);

	const monthOptions = useMemo(() => getMonthOptions(), []);
	const currentMonthOption = getMonthOption(selectedMonth);

	const yearOptions = useMemo(() => getYearOptions(), []);
	const currentYearOption = yearOptions.find(yearOption => Number(yearOption.value) === selectedYear);

	function handleSelectMonth(option: SelectOptionProps) {
		handleSelectMonthAndYear(Number(option.value));
	}

	function handleSelectYear(option: SelectOptionProps) {
		handleSelectMonthAndYear(selectedMonth, Number(option.value));
	}

	if (!userCreatedAt || typeof selectedMonth === 'undefined') return null;

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
