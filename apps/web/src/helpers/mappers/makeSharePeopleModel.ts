import { SharePeople } from '@/models/SharePeople';

export interface RawSharePeople {
	id: number;
	name: string;
	whatsapp: string;
	day_to_send_message: number;
	user_id: string;
	created_at: string;
	updated_at: string;
}

export function makeSharePeopleModel(rawSharePeople: RawSharePeople) {
	return new SharePeople({
		id: rawSharePeople.id,
		createdAt: rawSharePeople.created_at,
		dayToSendInvoice: rawSharePeople.day_to_send_message,
		name: rawSharePeople.name,
		updatedAt: rawSharePeople.updated_at,
		whatsapp: rawSharePeople.whatsapp,
		userId: rawSharePeople.user_id,
	});
}
