import { makeSharePeopleModel, RawSharePeople } from '@/helpers/mappers/makeSharePeopleModel';
import { httpClient } from '@/providers/HTTPClient';
import { useQuery } from 'react-query';

interface FindSharePeopleInput {
	sharePeopleId: number;
}

interface FindSharePeopleHttpResponse {
	sharePerson: RawSharePeople;
}

export function useFindSharePeopleApi({ sharePeopleId }: FindSharePeopleInput) {
	return useQuery({
		queryKey: ['share-people', sharePeopleId],
		queryFn: async () => {
			const response = await httpClient.get<FindSharePeopleHttpResponse>(`/share-people/${sharePeopleId}`);
			const { sharePerson } = response.data;

			return makeSharePeopleModel(sharePerson);
		},
		enabled: !!sharePeopleId,
	});
}
