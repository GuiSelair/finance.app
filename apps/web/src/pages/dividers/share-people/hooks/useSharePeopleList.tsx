import { useEffect, useMemo } from 'react';
import { TrashSimple as TrashIcon, PencilSimple as PencilSimpleIcon } from 'phosphor-react';

import { Avatar, Button, Flex } from '@/components';
import { useFetchSharePeopleApi } from '@/hooks/api/sharePeople/useFetchSharePeople.api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDisableSharePeopleApi } from '@/hooks/api/sharePeople/useDisableSharePeople.api';

export function useSharePeopleList() {
	const router = useRouter();
	const { data: sharePeopleResponse, isLoading: isLoadingSharePeople, isError } = useFetchSharePeopleApi();
	const { mutateAsync: disableSharePeopleFn, isLoading: isDisabling } = useDisableSharePeopleApi();

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
								isDisabled={isDisabling}
							>
								<PencilSimpleIcon />
							</Button>
							<Button
								variant="dangerGhost"
								size="icon"
								onClick={() => disableSharePeopleFn(sharePerson.id)}
								isLoading={isDisabling}
							>
								<TrashIcon />
							</Button>
						</Flex>
					),
				};
			}) || []
		);
	}, [sharePeopleResponse, isDisabling]);

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
		isDisabling,
	};
}
