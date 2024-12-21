import { parseISO } from 'date-fns';

export interface CardProps {
	id: string;
	userId: string;
	name: string;
	flag: string;
	dueDay: number;
	turningDay: number;
	createdAt?: string;
	updatedAt?: string;
	total?: number;
}

export class Card {
	id: string;
	name: string;
	flag: string;
	userId: string;
	dueDay: number;
	turningDay: number;
	createdAt?: Date;
	updatedAt?: Date;
	total?: number;

	constructor(data: CardProps) {
		this.id = data.id;
		this.name = data.name;
		this.flag = data.flag;
		this.userId = data.userId;
		this.dueDay = data.dueDay;
		this.turningDay = data.turningDay;
		this.createdAt = data.createdAt ? parseISO(data.createdAt) : undefined;
		this.updatedAt = data.updatedAt ? parseISO(data.updatedAt) : undefined;
		this.total = data.total || 0;
	}
}
