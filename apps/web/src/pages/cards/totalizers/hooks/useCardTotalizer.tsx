import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';

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

	function transformTuningDayToDate(tuningDay: number) {
		const monthFormatted = String(month + 1).padStart(2, '0');
		const turningDayFormatted = String(tuningDay).padStart(2, '0');

		return `${turningDayFormatted}/${monthFormatted}/${year}`;
	}

	const tableDataMemoized = useMemo(() => {
		if (!cardTotalizer) return [];

		return cardTotalizer.map(card => ({
			id: card.id,
			name: card.name,
			turningDay: transformTuningDayToDate(card.turningDay),
			total: formatCurrency(card.total),
		}));
	}, [cardTotalizer]);

	return {
		cardTotalizerTableColumns: CARD_TOTALIZER_TABLE_COLUMNS,
		cardTotalizerTableData: tableDataMemoized,
		isLoadingTableContent: isLoading,
	};
}
