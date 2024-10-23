import { Card } from '@/models/Card';

export interface RawCard {
	id: string;
	user_id: string;
	name: string;
	flag: string;
	due_day: number;
	turning_day: number;
	created_at: string;
	updated_at: string;
}

export function makeCardModel(rawCard: RawCard): Card {
	return new Card({
		id: rawCard.id,
		userId: rawCard.user_id,
		name: rawCard.name,
		flag: rawCard.flag,
		dueDay: rawCard.due_day,
		turningDay: rawCard.turning_day,
		createdAt: rawCard.created_at,
		updatedAt: rawCard.updated_at,
	});
}
