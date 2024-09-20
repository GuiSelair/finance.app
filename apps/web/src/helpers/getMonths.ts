const months = [
	{ value: 0, label: 'Janeiro' },
	{ value: 1, label: 'Fevereiro' },
	{ value: 2, label: 'Março' },
	{ value: 3, label: 'Abril' },
	{ value: 4, label: 'Maio' },
	{ value: 5, label: 'Junho' },
	{ value: 6, label: 'Julho' },
	{ value: 7, label: 'Agosto' },
	{ value: 8, label: 'Setembro' },
	{ value: 9, label: 'Outubro' },
	{ value: 10, label: 'Novembro' },
	{ value: 11, label: 'Dezembro' },
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
