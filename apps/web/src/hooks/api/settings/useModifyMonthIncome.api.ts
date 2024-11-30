import { useMutation } from 'react-query';
import { useContextSelector } from 'use-context-selector';

import { selectedMonthYearContext } from '@/contexts';
import { httpClient } from '@/providers/HTTPClient';

interface ModifyMonthIncomeMutationProps {
	income: number;
}

export function useModifyMonthIncomeApi() {
	const month = useContextSelector(selectedMonthYearContext, ctx => ctx.month);
	const year = useContextSelector(selectedMonthYearContext, ctx => ctx.year);

	return useMutation({
		mutationKey: ['month-income', month, year],
		mutationFn: async (data: ModifyMonthIncomeMutationProps) => {
			await httpClient.post('/settings/incomes', {
				body: {
					month,
					year,
					income: data.income,
				},
			});
		},
	});
}
