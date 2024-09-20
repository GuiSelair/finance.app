import { httpClient } from '@/providers/HTTPClient';

interface IFetchCardTotalizerParams {
	month: number;
	year: number;
}

interface IFetchCardTotalizerRequestResponse {
	id: string;
	name: string;
	turningDay: number;
	total: number;
}

export async function fetchCardTotalizer({
	month,
	year,
}: IFetchCardTotalizerParams): Promise<IFetchCardTotalizerRequestResponse[]> {
	const apiResponse = await httpClient.get<
		IFetchCardTotalizerRequestResponse[]
	>('/cards/totalizers', {
		params: {
			month,
			year,
		},
	});

	const data = apiResponse.data;
	return data;
}
