import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';

import { Avatar } from '@/components';
import { useFetchTotalPerPersonApi } from '@/hooks/api/sharePeople/useFetchTotalPerPerson.api';

export function useTotalPerPerson() {
	const { data: totalPerPersonListResponse, isLoading: isLoadingTotalPerPerson, isError } = useFetchTotalPerPersonApi();

	const totalPerPersonList = useMemo(() => {
		return (
			totalPerPersonListResponse?.map(totalPerPerson => {
				return {
					avatar: <Avatar name={totalPerPerson.person.name} />,
					id: totalPerPerson.person.id,
					name: totalPerPerson.person.name,
					monthYear: totalPerPerson.getMonthYearFormatted(),
					total: totalPerPerson.getTotalFormatted(),
				};
			}) || []
		);
	}, [totalPerPersonListResponse]);

	const isEmptyState = !totalPerPersonList?.length && !isLoadingTotalPerPerson;

	useEffect(() => {
		if (isError) {
			toast.error(
				'Ops! Aconteceu um erro ao buscar o total por pessoa da divisão. Atualize a página e tente novamente',
			);
		}
	}, [isError]);

	return {
		totalPerPersonList,
		isEmptyState,
		isLoadingTotalPerPerson,
	};
}
