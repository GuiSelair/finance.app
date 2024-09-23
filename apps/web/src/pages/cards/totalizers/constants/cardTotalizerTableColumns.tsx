import { TableColumnsProps } from '@/components/Table';

import { Button } from '@/components/Button';
import { CardTotalizerHighlightValue } from '../CardTotalizer.styles';

export const CARD_TOTALIZER_TABLE_COLUMNS: TableColumnsProps = [
	{
		header: 'Chave ID',
		accessorKey: 'id',
		size: 200,
	},
	{
		header: 'Apelido',
		accessorKey: 'name',
		size: 500,
		cell: ({ row }) => (
			<CardTotalizerHighlightValue>
				{row.original.name}
			</CardTotalizerHighlightValue>
		),
	},
	{
		header: 'Dia da melhor compra',
		accessorKey: 'turningDay',
		size: 500,
	},
	{
		header: 'Total',
		accessorKey: 'total',
		size: 300,
		cell: ({ row }) => (
			<CardTotalizerHighlightValue>
				{row.original.total}
			</CardTotalizerHighlightValue>
		),
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
