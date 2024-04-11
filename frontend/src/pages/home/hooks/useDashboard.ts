import { useContextSelector } from 'use-context-selector';

import { selectedMonthYearContext } from '@/contexts';

export function useDashboard() {
	const {
		handleRestoreToCurrentMonthAndYear,
		handleSelectMonthAndYear,
		month,
		year,
	} = useContextSelector(selectedMonthYearContext, ctx => ctx);

	return {
		handleRestoreToCurrentMonthAndYear,
		handleSelectMonthAndYear,
		month,
		year,
	};
}
