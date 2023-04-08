export function getYears(firstYearToGenerate: number) {
	const currentYear = new Date().getFullYear();
	const years = [];

	for (let i = currentYear; i >= firstYearToGenerate; i--) {
		years.push({ value: i, label: i });
	}

	return years;
}
