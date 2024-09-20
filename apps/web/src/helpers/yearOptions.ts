import { getYear } from 'date-fns';

export function getYearOptions(firstYearToGenerate: number) {
	const currentYear = getYear(new Date());
	const years = [];

	for (let i = currentYear; i >= firstYearToGenerate; i--) {
		years.push({ value: String(i), label: String(i) });
	}

	return years;
}
