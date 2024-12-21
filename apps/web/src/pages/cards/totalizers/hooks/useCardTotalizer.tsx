import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { addMonths } from 'date-fns';

import { formatCurrency } from '@/helpers/formatCurrency';
import { useCardTotalizerApi } from '@/hooks/api/cards/useCardTotalizer.api';
import { selectedMonthYearContext } from '@/contexts';

import { CARD_TOTALIZER_TABLE_COLUMNS } from '../constants/cardTotalizerTableColumns';

export function useCardTotalizer() {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);
	const { data: cardTotalizer, isLoading } = useCardTotalizerApi({
		month,
		year,
	});

	function convertDueDayToDate(day: number) {
		const monthFormatted = String(month + 1).padStart(2, '0');
		const turningDayFormatted = String(day).padStart(2, '0');
		const dateFormatted = `${year}-${monthFormatted}-${turningDayFormatted}T00:00:00`;

		return addMonths(new Date(dateFormatted), 1).toLocaleDateString('pt-BR');
	}

	const tableDataMemoized = useMemo(() => {
		if (!cardTotalizer) return [];

		return cardTotalizer.map(card => ({
			id: card.id,
			name: card.name,
			turningDay: String(card.turningDay).padStart(2, '0'),
			dueDate: convertDueDayToDate(card.dueDay),
			total: formatCurrency(card.total || 0),
		}));
	}, [cardTotalizer]);

	return {
		cardTotalizerTableColumns: CARD_TOTALIZER_TABLE_COLUMNS,
		cardTotalizerTableData: tableDataMemoized,
		isLoadingTableContent: isLoading,
	};
}
