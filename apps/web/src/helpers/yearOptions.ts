export function getYearOptions(yearRange = 10) {
	const today = new Date();
	return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
		value: (today.getFullYear() - yearRange + i).toString(),
		label: (today.getFullYear() - yearRange + i).toString(),
	}));
}
