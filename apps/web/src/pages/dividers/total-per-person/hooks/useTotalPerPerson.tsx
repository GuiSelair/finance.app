import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { WhatsappLogo } from 'phosphor-react';

import { Avatar, Button, Flex, Spinner } from '@/components';
import { useFetchTotalPerPersonApi } from '@/hooks/api/sharePeople/useFetchTotalPerPerson.api';
import { useContextSelector } from 'use-context-selector';
import { selectedMonthYearContext } from '@/contexts/SelectedMonthYearContext';
import { useFetchSharedExpensesByPersonApi } from '@/hooks/api/sharePeople/useFetchSharedExpenseslPerPerson.api';
import { formatCurrency } from '@/helpers/formatCurrency';
import { formatParcel } from '@/helpers/formatParcel';

export function useTotalPerPerson() {
	const month = useContextSelector(selectedMonthYearContext, state => state.month);
	const year = useContextSelector(selectedMonthYearContext, state => state.year);
	const [selectedPersonId, setSelectedPersonId] = useState<number | null>(null);
	const { data: totalPerPersonListResponse, isLoading: isLoadingTotalPerPerson, isError } = useFetchTotalPerPersonApi();
	const { data: sharedExpensesByPerson, isLoading: isLoadingSharedExpensesByPerson } =
		useFetchSharedExpensesByPersonApi(selectedPersonId, { enabled: !!selectedPersonId });

	const totalPerPersonList = useMemo(() => {
		return (
			totalPerPersonListResponse?.map(totalPerPerson => {
				return {
					avatar: <Avatar name={totalPerPerson.person.name} />,
					id: totalPerPerson.person.id,
					name: totalPerPerson.person.name,
					monthYear: totalPerPerson.getMonthYearFormatted(),
					total: totalPerPerson.getTotalFormatted(),
					actions: (
						<Flex padding="0 4px">
							<Button variant="ghost" size="icon" onClick={() => setSelectedPersonId(totalPerPerson.person.id)}>
								{isLoadingSharedExpensesByPerson ? <Spinner size="sm" /> : <WhatsappLogo weight="light" size={18} />}
							</Button>
						</Flex>
					),
				};
			}) || []
		);
	}, [totalPerPersonListResponse, isLoadingSharedExpensesByPerson]);

	function makeWhatsappTemplate(personId: number) {
		const sharedExpenseByPerson = totalPerPersonListResponse?.find(expense => expense.person.id === personId);
		const whatsappLink = `https://wa.me/55${sharedExpenseByPerson?.person.whatsapp}`;

		const template = `
			Sua conta chegou!

			Valor total:  *${sharedExpenseByPerson?.getTotalFormatted()}*

			_Detalhamento:_
			${sharedExpensesByPerson?.expensesSharedDetails
				.map(
					(expense, index) =>
						`_${index + 1}. ${expense.name}[${formatParcel(
							expense.currentParcel,
							expense.totalParcel,
						)}]: R$ ${formatCurrency(expense.amount)}`,
				)
				.join('\n')}

			---------------
			_Referente ao ${month}/${year}_
		`;

		window.open(`${whatsappLink}?text=${template}`, '_blank');
	}

	const isEmptyState = !totalPerPersonList?.length && !isLoadingTotalPerPerson;

	useEffect(() => {
		if (isError) {
			toast.error(
				'Ops! Aconteceu um erro ao buscar o total por pessoa da divisão. Atualize a página e tente novamente',
			);
		}
	}, [isError]);

	/** Effect responsável por abrir o whatsapp com o template de compartilhamento de despesas assim que os dados do detalhamento das despesas forem carregados. */
	useEffect(() => {
		if (sharedExpensesByPerson && selectedPersonId) {
			makeWhatsappTemplate(selectedPersonId);
		}
	}, [sharedExpensesByPerson]);

	return {
		totalPerPersonList,
		isEmptyState,
		isLoadingTotalPerPerson,
		isLoadingSharedExpensesByPerson,
	};
}
