import { useEffect, useMemo } from 'react';
import { TrashSimple as TrashIcon, PencilSimple as PencilSimpleIcon } from 'phosphor-react';

import { Avatar, Button, Flex } from '@/components';
import { useFetchSharePeopleApi } from '@/hooks/api/sharePeople/useFetchSharePeople.api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export function useSharePeopleList() {
	const router = useRouter();
	const { data: sharePeopleResponse, isLoading: isLoadingSharePeople, isError } = useFetchSharePeopleApi();
	const sharePeopleList = useMemo(() => {
		return (
			sharePeopleResponse?.map(sharePerson => {
				return {
					id: sharePerson.id,
					avatar: <Avatar name={sharePerson.name} />,
					name: sharePerson.name,
					whatsapp: sharePerson.getWhatsappFormatted(),
					dayToSendInvoice: sharePerson.dayToSendInvoice,
					actions: (
						<Flex margin="0 0 0 4px" gap="0.5rem">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => router.push(`/registrations/share-people/${sharePerson.id}`)}
							>
								<PencilSimpleIcon />
							</Button>
							<Button variant="dangerGhost" size="icon">
								<TrashIcon />
							</Button>
						</Flex>
					),
				};
			}) || []
		);
	}, [sharePeopleResponse]);

	const isEmptyState = !sharePeopleResponse?.length && !isLoadingSharePeople;

	useEffect(() => {
		if (isError) {
			toast.error(
				'Ops! Aconteceu um erro ao buscar as pessoas divisoras cadastradas. Atualize a página e tente novamente',
			);
		}
	}, [isError]);

	return {
		sharePeopleList,
		isEmptyState,
		isLoadingSharePeople,
	};
}
