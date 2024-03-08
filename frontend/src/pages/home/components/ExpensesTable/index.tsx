import {
	MagnifyingGlass,
	Funnel,
	ArrowCircleDown,
	CheckSquare,
	DotsThreeOutlineVertical,
} from 'phosphor-react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { createColumnHelper } from '@tanstack/react-table';

import { TextInput } from '@/components/Form/TextInput';
import Table from '@/components/Table';
import { httpClient } from '@/providers/HTTPClient';
import { ExpenseInMonth } from '@/models/expenseInMonth';
import { ExpenseDetailsModal } from '../ExpenseDetailsModal';
import { formatCurrency } from 'helpers/formatCurrency';

import { FilterButton, FilterContainer } from './styles';
import { Button } from '@/components/Button';

interface ExpensesTableDataProps {
	name: string;
	card: string;
	parcel: string;
	parcel_amount: string;
	is_shared: boolean;
	is_recurring: boolean;
	options: JSX.Element | string;
}

interface ExpensesTableProps {
	month: number;
	year: number;
}

const columnBuilder = createColumnHelper<ExpensesTableDataProps>();

const columns = [
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
	columnBuilder.accessor('parcel_amount', {
		id: 'expense-parcel-amount',
		header: 'Valor da parcela',
		size: 400,
	}),
	columnBuilder.display({
		id: 'is_shared',
		header: 'Compra dividida?',
		cell: ({ row }) =>
			row.original.is_shared && (
				<CheckSquare weight="fill" size={24} color="#248277" />
			),
		size: 500,
	}),
	columnBuilder.display({
		id: 'is_recurring',
		header: 'Despesa fixa?',
		cell: ({ row }) =>
			row.original.is_recurring && (
				<CheckSquare weight="fill" size={24} color="#248277" />
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

export default function ExpensesTable({ month, year }: ExpensesTableProps) {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<ExpenseInMonth>(
		{} as ExpenseInMonth,
	);
	const { data: allExpensesInMonth, refetch } = useQuery(
		['month-expenses', month, year],
		async () => {
			try {
				const response = await httpClient.get<ExpenseInMonth[]>(
					'/expenses/list',
					{
						params: {
							month,
							year,
						},
					},
				);

				return response.data;
			} catch (error) {
				if (error instanceof AxiosError) {
					const errorFromServer = error.response?.data;

					toast.error(
						'Aconteceu um erro inesperado. Por favor, tente novamente...',
						{
							position: 'bottom-left',
							theme: 'colored',
						},
					);
					throw new Error(errorFromServer.error);
				}
			}
		},
	);

	const expenses: ExpensesTableDataProps[] = useMemo(() => {
		if (!allExpensesInMonth) return [];

		const handleSelectExpense = (expenseInMonth: ExpenseInMonth) => {
			setSelectedExpense(expenseInMonth);
			setIsOpenModal(true);
		};

		return allExpensesInMonth.map(expenseInMonth => ({
			name: expenseInMonth.expense.name,
			card: expenseInMonth.expense.card.name,
			parcel: `${String(expenseInMonth.number_current_of_parcel).padStart(
				2,
				'0',
			)} / ${String(expenseInMonth.number_total_of_parcel).padStart(2, '0')}`,
			parcel_amount: formatCurrency(expenseInMonth.value_of_parcel),
			is_shared: expenseInMonth.expense.split_expense,
			is_recurring: expenseInMonth.expense.is_recurring,
			options: (
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={() => handleSelectExpense(expenseInMonth)}
				>
					<DotsThreeOutlineVertical weight="fill" />
					Detalhes
				</Button>
			),
		}));
	}, [allExpensesInMonth]);

	useEffect(() => {
		refetch();
	}, [month, year]); // eslint-disable-line

	return (
		<>
			<FilterContainer>
				<TextInput
					icon={() => <MagnifyingGlass size={24} />}
					placeholder="Pesquise pelo nome da despesa"
				/>
				<FilterButton>
					<Funnel size={24} />
					Filtros
				</FilterButton>
				<FilterButton>
					<ArrowCircleDown size={24} />
					Exportar
				</FilterButton>
			</FilterContainer>
			<Table columns={columns} data={expenses} />
			<ExpenseDetailsModal
				isOpenModal={isOpenModal}
				onClose={() => setIsOpenModal(false)}
				expense={selectedExpense}
				month={month}
				year={year}
			/>
		</>
	);
}
