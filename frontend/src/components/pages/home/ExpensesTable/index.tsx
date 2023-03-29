import { MagnifyingGlass, Funnel, ArrowCircleDown } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { Input } from '@/components/shared/Form/Input';
import Table from '@/components/shared/Table';
import { httpClient } from '@/providers/HTTPClient';
import { ExpenseInMonth } from '@/models/expenseInMonth';
import { ExpenseDetailsModal } from '@/components/pages/home/ExpenseDetailsModal';

import {
	FilterButton,
	FilterContainer,
	ShowExpenseDetailButton,
} from './styles';

interface ExpensesTableDataProps {
	id: string;
	description: string;
	card: string;
	parcel: string;
	parcel_amount: string;
	is_shared: string;
	options: string | React.ReactNode;
}

const columns = [
	{
		Header: 'Chave ID',
		accessor: 'id',
		width: 50,
	},
	{
		Header: 'Descrição',
		accessor: 'description',
	},
	{
		Header: 'Vinculado ao',
		accessor: 'card',
	},
	{
		Header: 'Parcela',
		accessor: 'parcel',
	},
	{
		Header: 'Valor da parcela',
		accessor: 'parcel_amount',
	},
	{
		Header: 'Compra dividida?',
		accessor: 'is_shared',
	},
	{
		Header: 'Opções',
		accessor: 'options',
	},
];

export default function ExpensesTable() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<ExpenseInMonth>(
		{} as ExpenseInMonth,
	);
	const {
		data: allExpensesInMonth,
		isLoading,
		isError,
		error,
	} = useQuery(['month-expenses'], async () => {
		try {
			const response = await httpClient.get<ExpenseInMonth[]>(
				'/expenses/list',
				{
					params: {
						month: 4,
						year: 2023,
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
	});

	const expenses: ExpensesTableDataProps[] = useMemo(() => {
		if (!allExpensesInMonth) return [];

		const handleSelectExpense = (expenseInMonth: ExpenseInMonth) => {
			setSelectedExpense(expenseInMonth);
			setIsOpenModal(true);
		};

		return allExpensesInMonth.map(expenseInMonth => ({
			id: expenseInMonth.expense_id,
			description: expenseInMonth.expense.name,
			card: expenseInMonth.expense.card_id,
			parcel: `${expenseInMonth.number_current_of_parcel}/${expenseInMonth.number_total_of_parcel}`,
			parcel_amount: String(expenseInMonth.value_of_parcel),
			is_shared: expenseInMonth.expense.split_expense ? 'Sim' : 'Não',
			options: (
				<ShowExpenseDetailButton
					type="button"
					onClick={() => handleSelectExpense(expenseInMonth)}
				>
					Ver mais detalhes
				</ShowExpenseDetailButton>
			),
		}));
	}, [allExpensesInMonth]);

	if (isLoading) return <p>Carregando...</p>;

	if (isError) return <p>{JSON.stringify(error, null, 2)}</p>;

	return (
		<>
			<FilterContainer>
				<Input
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
			/>
		</>
	);
}
