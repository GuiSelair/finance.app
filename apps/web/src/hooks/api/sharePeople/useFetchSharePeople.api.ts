import { makeSharePeopleModel, RawSharePeople } from '@/helpers/mappers/makeSharePeopleModel';
import { httpClient } from '@/providers/HTTPClient';
import { useQuery } from 'react-query';

interface FetchSharePeopleHttpResponse {
	share_people: RawSharePeople[];
}

export function useFetchSharePeopleApi() {
	return useQuery({
		queryKey: ['share-people'],
		queryFn: async () => {
			const response = await httpClient.get<FetchSharePeopleHttpResponse>('/share-people');
			const { share_people: sharePeople } = response.data;

			return sharePeople?.map(sharePerson => makeSharePeopleModel(sharePerson)) || [];
		},
	});
}
