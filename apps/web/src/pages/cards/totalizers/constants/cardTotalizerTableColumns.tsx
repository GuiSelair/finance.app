import { DataTableColumn } from '@/components/DataTable';

import { Button } from '@/components/Button';
import { CardTotalizerHighlightValue } from '../CardTotalizer.styles';

type CartTotalizerTableColumns = DataTableColumn<
	{
		id: string;
		name: string;
		turningDay: string;
		dueDate: string;
		total: string;
	},
	unknown
>;

export const CARD_TOTALIZER_TABLE_COLUMNS: CartTotalizerTableColumns = [
	{
		header: 'Chave ID',
		accessorKey: 'id',
		size: 200,
	},
	{
		header: 'Apelido',
		accessorKey: 'name',
		size: 500,
		cell: ({ row }) => <CardTotalizerHighlightValue>{row.original.name}</CardTotalizerHighlightValue>,
	},
	{
		header: 'Dia da melhor compra',
		accessorKey: 'turningDay',
		size: 500,
	},
	{
		header: 'Data de vencimento',
		accessorKey: 'dueDate',
		size: 500,
	},
	{
		header: 'Total',
		accessorKey: 'total',
		size: 300,
		cell: ({ row }) => <CardTotalizerHighlightValue>{row.original.total}</CardTotalizerHighlightValue>,
	},
	{
		header: 'Ações',
		accessorKey: 'actions',
		cell: () => (
			<Button size="sm" variant="outline" isDisabled>
				Detalhes
			</Button>
		),
	},
];
