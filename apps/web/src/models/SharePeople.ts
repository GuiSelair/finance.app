import { applyMasks } from '@/constants/inputMasks';

interface SharePeopleProps {
	id: number;
	name: string;
	dayToSendInvoice: number;
	whatsapp: string;
	createdAt: string;
	updatedAt: string;
	userId?: string;
}

export class SharePeople {
	public id: number;
	public name: string;
	public dayToSendInvoice: number;
	public whatsapp: string;
	public createdAt: string;
	public updatedAt: string;
	public userId?: string;

	constructor(props: SharePeopleProps) {
		this.id = props.id;
		this.name = props.name;
		this.dayToSendInvoice = props.dayToSendInvoice;
		this.whatsapp = props.whatsapp;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
		this.userId = props.userId;
	}

	getWhatsappFormatted() {
		return applyMasks.applyPhoneMask(this.whatsapp);
	}
}
