import { DataTableColumn } from '@/components/DataTable';

export const sharePeopleListColumns = [
	{
		id: 'avatar',
		header: 'Avatar',
		accessorKey: 'avatar',
		cell: ({ row }) => row.original.avatar,
		size: 50,
	},
	{
		id: 'name',
		header: 'Nome',
		accessorKey: 'name',
	},
	{
		id: 'whatsapp',
		accessorKey: 'whatsapp',
		header: 'Whatsapp',
	},
	{
		id: 'dayToSendInvoice',
		accessorKey: 'dayToSendInvoice',
		header: 'Dia de envio de fatura',
	},
	{
		id: 'actions',
		header: 'Ações',
		cell: ({ row }) => row.original.actions,
		size: 30,
	},
] as DataTableColumn<{
	name: string;
	whatsapp: string;
	dayToSendInvoice: number;
	actions: React.ReactNode;
	avatar: React.ReactNode;
}>;
