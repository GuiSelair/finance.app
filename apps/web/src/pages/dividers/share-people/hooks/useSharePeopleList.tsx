import { useMemo } from 'react';
import { TrashSimple as TrashIcon, PencilSimple as PencilSimpleIcon } from 'phosphor-react';

import { Avatar, Button, Flex } from '@/components';

export function useSharePeopleList() {
	const sharePeopleList = useMemo(() => {
		return [
			{
				id: 1,
				name: 'Jonh Doe',
				whatsapp: '55992174545',
				dayToSendInvoice: 5,
			},
		].map(sharePerson => {
			return {
				id: sharePerson.id,
				avatar: <Avatar name={sharePerson.name} />,
				name: sharePerson.name,
				whatsapp: sharePerson.whatsapp,
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
		});
	}, []);

	return {
		sharePeopleList,
	};
}
