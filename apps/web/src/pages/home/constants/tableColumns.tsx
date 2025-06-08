import { createColumnHelper } from '@tanstack/react-table';
import { CheckCircle as CheckCircleIcon } from 'phosphor-react';

import { Flex } from '@/components';

import { IExpensesTableData } from '../components/ExpensesTable/ExpensesTable';

const columnBuilder = createColumnHelper<IExpensesTableData>();

export const expensesTableColumns = [
	columnBuilder.accessor('name', {
		id: 'expense-name',
		header: 'Nome',
		size: 800,
	}),
	columnBuilder.accessor('card', {
		id: 'expense-card',
		header: 'Vinculado ao',
		size: 300,
	}),
	columnBuilder.accessor('parcel', {
		id: 'expense-parcel',
		header: 'Parcela',
		size: 300,
	}),
	columnBuilder.accessor('parcelAmount', {
		id: 'expense-parcel-amount',
		header: 'Valor da parcela',
		size: 400,
	}),
	columnBuilder.display({
		id: 'is-shared',
		header: 'Compra dividida?',
		cell: ({ row }) =>
			row.original.isShared && (
				<Flex alignItems="center" justifyContent="center">
					<CheckCircleIcon size={20} color="#036666" />
				</Flex>
			),
		size: 500,
	}),
	columnBuilder.display({
		id: 'is-recurring',
		header: 'Despesa fixa?',
		cell: ({ row }) =>
			row.original.isRecurring && (
				<Flex alignItems="center" justifyContent="center">
					<CheckCircleIcon size={20} color="#036666" />
				</Flex>
			),
		size: 400,
	}),
	columnBuilder.display({
		id: 'options',
		header: 'Opções',
		cell: ({ row }) => row.original.options,
		size: 160,
	}),
];
