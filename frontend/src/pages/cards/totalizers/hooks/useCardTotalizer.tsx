import { useMemo } from 'react';

import { formatCurrency } from '@/helpers/formatCurrency';
import { useFetchCardTotalizerApi } from './useFetchCardTotalizerApi';
import { CARD_TOTALIZER_TABLE_COLUMNS } from '../constants/cardTotalizerTableColumns';

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

export function useCardTotalizer() {
	const { data: cardTotalizer, isLoading } = useFetchCardTotalizerApi({
		month: currentMonth,
		year: currentYear,
	});

	function transformTuningDayToDate(tuningDay: number) {
		const monthFormatted = String(currentMonth + 1).padStart(2, '0');
		const turningDayFormatted = String(tuningDay).padStart(2, '0');

		return `${turningDayFormatted}/${monthFormatted}/${currentYear}`;
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
