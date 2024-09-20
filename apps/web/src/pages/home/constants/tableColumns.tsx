import { createColumnHelper } from '@tanstack/react-table';
import { CheckSquare as CheckSquareIcon } from 'phosphor-react';
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
				<CheckSquareIcon weight="fill" size={24} color="#248277" />
			),
		size: 500,
	}),
	columnBuilder.display({
		id: 'is-recurring',
		header: 'Despesa fixa?',
		cell: ({ row }) =>
			row.original.isRecurring && (
				<CheckSquareIcon weight="fill" size={24} color="#248277" />
			),
		size: 400,
	}),
	columnBuilder.display({
		id: 'options',
		header: 'Opções',
		cell: ({ row }) => row.original.options,
		size: 100,
	}),
];
