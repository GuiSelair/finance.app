import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { WhatsappLogo } from 'phosphor-react';

import { Avatar, Button, Flex } from '@/components';
import { useFetchTotalPerPersonApi } from '@/hooks/api/sharePeople/useFetchTotalPerPerson.api';
import { SharedExpense } from '@/models/SharedExpense';
import { useContextSelector } from 'use-context-selector';
import { selectedMonthYearContext } from '@/contexts/SelectedMonthYearContext';

export function useTotalPerPerson() {
	const month = useContextSelector(selectedMonthYearContext, state => state.month);
	const year = useContextSelector(selectedMonthYearContext, state => state.year);
	const { data: totalPerPersonListResponse, isLoading: isLoadingTotalPerPerson, isError } = useFetchTotalPerPersonApi();

	const totalPerPersonList = useMemo(() => {
		return (
			totalPerPersonListResponse?.map(totalPerPerson => {
				const whatsappLink = `https://wa.me/55${totalPerPerson.person.whatsapp}?text=${makeWhatsappTemplate(
					totalPerPerson,
				)}`;
				return {
					avatar: <Avatar name={totalPerPerson.person.name} />,
					id: totalPerPerson.person.id,
					name: totalPerPerson.person.name,
					monthYear: totalPerPerson.getMonthYearFormatted(),
					total: totalPerPerson.getTotalFormatted(),
					actions: (
						<Flex padding="0 4px">
							<Button variant="ghost" size="icon" onClick={() => window.open(whatsappLink, '_blank')}>
								<WhatsappLogo weight="light" size={18} />
							</Button>
						</Flex>
					),
				};
			}) || []
		);
	}, [totalPerPersonListResponse]);

	function makeWhatsappTemplate(totalPerPerson: SharedExpense) {
		return `
			Sua conta chegou!

			Valor total:  *${totalPerPerson.getTotalFormatted()}*

			_Detalhamento:_
			_1. [Despesa 1][parcelas]: R$ ${totalPerPerson.getTotalFormatted()}_

			---------------

			_Pix para pagamento: [Chave pix]_

			_Referente ao ${month}/${year}_
		`;
	}

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
