import { parseISO } from 'date-fns';

export function dateFormat(date: Date, format: string): string {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	return format
		.replace('dd', String(day).padStart(2, '0'))
		.replace('MM', String(month).padStart(2, '0'))
		.replace('yyyy', String(year));
}

export function parseIsoTODate(dateIso?: string) {
	if (!dateIso) {
		console.warn('DateISO is invalid.');
		return undefined;
	}

	return parseISO(dateIso);
}
