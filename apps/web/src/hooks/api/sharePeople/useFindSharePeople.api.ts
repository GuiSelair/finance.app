import { makeSharePeopleModel, RawSharePeople } from '@/helpers/mappers/makeSharePeopleModel';
import { httpClient } from '@/providers/HTTPClient';
import { useQuery } from 'react-query';

interface FindSharePeopleInput {
	sharePeopleId: number;
}

interface FindSharePeopleHttpResponse {
	share_person: RawSharePeople;
}

export function useFindSharePeopleApi({ sharePeopleId }: FindSharePeopleInput) {
	return useQuery({
		queryKey: ['share-people', sharePeopleId],
		queryFn: async () => {
			const response = await httpClient.get<FindSharePeopleHttpResponse>(`/share-people/${sharePeopleId}`);
			const { share_person: sharePerson } = response.data;

			return makeSharePeopleModel(sharePerson);
		},
		enabled: !!sharePeopleId,
	});
}
