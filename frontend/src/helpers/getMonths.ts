const months = [
	{ value: 1, label: 'Janeiro' },
	{ value: 2, label: 'Fevereiro' },
	{ value: 3, label: 'Março' },
	{ value: 4, label: 'Abril' },
	{ value: 5, label: 'Maio' },
	{ value: 6, label: 'Junho' },
	{ value: 7, label: 'Julho' },
	{ value: 8, label: 'Agosto' },
	{ value: 9, label: 'Setembro' },
	{ value: 10, label: 'Outubro' },
	{ value: 11, label: 'Novembro' },
	{ value: 12, label: 'Dezembro' },
];

export function getMonths(short = false) {
	if (short) {
		return months.map(month => ({
			value: month.value,
			label: month.label.slice(0, 3),
		}));
	}

	return months;
}

export function getMonth(month: number) {
	const monthFound = months.find(monthItem => monthItem.value === month);

	return monthFound;
}
