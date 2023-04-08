import { Select } from '@/components/shared/Form/Select';
import { getMonths, getMonth } from '@/helpers/getMonths';
import { getYears } from '@/helpers/getYears';

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
	const months = getMonths();
	const currentMonthOption = getMonth(month);

	const years = getYears(2022);
	const currentYearOption = years.find(yearOption => yearOption.value === year);

	return (
		<SelectMonthAndYearContainer>
			<Select
				options={months}
				defaultValue={currentMonthOption}
				placeholder="Mês"
				isClearable={false}
				noOptionsMessage={() => 'Mês não encontrado'}
				width="150px"
				onChange={(valueSelected: any) => {
					onSelectMonthAndYear(valueSelected?.value as number);
				}}
			/>
			<Select
				options={years}
				defaultValue={currentYearOption}
				placeholder="Ano"
				isClearable={false}
				noOptionsMessage={() => 'Ano não encontrado'}
				onChange={(valueSelected: any) => {
					onSelectMonthAndYear(undefined, valueSelected?.value as number);
				}}
			/>
		</SelectMonthAndYearContainer>
	);
}
