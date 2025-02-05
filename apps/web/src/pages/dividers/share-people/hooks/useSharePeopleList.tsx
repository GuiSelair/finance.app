import { useMemo } from 'react';
import { TrashSimple as TrashIcon, PencilSimple as PencilSimpleIcon } from 'phosphor-react';

import { Avatar, Button, Flex } from '@/components';
import { useFetchSharePeopleApi } from '@/hooks/api/sharePeople/useFetchSharePeople.api';

export function useSharePeopleList() {
	const { data: sharePeopleResponse } = useFetchSharePeopleApi();
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
							<Button variant="ghost" size="icon">
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

	return {
		sharePeopleList,
	};
}
