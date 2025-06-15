import { DataTableColumn } from '@/components/DataTable';
import { Text } from '@/components/Text';
export const totalPerPersonColumns = [
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
		id: 'monthYear',
		accessorKey: 'monthYear',
		header: 'Mês/Ano',
	},
	{
		id: 'total',
		accessorKey: 'total',
		header: 'Total',
		cell: ({ row }) => <Text weight="600">{row.original.total}</Text>,
	},
	{
		id: 'actions',
		header: 'Ações',
		accessorKey: 'actions',
		cell: ({ row }) => row.original.actions,
	},
] as DataTableColumn<{
	name: string;
	monthYear: string;
	total: string;
	avatar: React.ReactNode;
	actions: React.ReactNode;
}>;
