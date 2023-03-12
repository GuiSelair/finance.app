import { MagnifyingGlass, Funnel, ArrowCircleDown } from 'phosphor-react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { Input } from '@/components/shared/Form/Input';
import Table from '@/components/shared/Table';

import {
	FilterButton,
	FilterContainer,
	ShowExpenseDetailButton,
} from './styles';
import { httpClient } from '@/providers/HTTPClient';
import { Expense } from '@/models/expense';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ExpensesTableDataProps {
	id: string;
	description: string;
	card: string;
	parcel: string;
	parcel_amount: string;
	is_shared: string;
	options: string | React.ReactNode;
}

interface ListExpensesFromMonthProps {
	id: string;
	expense_id: string;
	number_current_of_parcel: number;
	number_total_of_parcel: number;
	month: number;
	year: number;
	value_of_parcel: number;
	isPaid: boolean;
	created_at: string;
	updated_at: string;
	expense: Expense;
}

export default function ExpensesTable() {
	const {
		data: allExpensesInMonth,
		isLoading,
		isError,
		error,
	} = useQuery(['month-expenses'], async () => {
		try {
			const response = await httpClient.get<ListExpensesFromMonthProps[]>(
				'/expenses/list',
				{
					params: {
						month: 10,
						year: 2022,
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
					onClick={() => console.log(expenseInMonth)}
				>
					Ver mais detalhes
				</ShowExpenseDetailButton>
			),
		}));
	}, [allExpensesInMonth]);

	const columns = useMemo(
		() => [
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
		],
		[],
	);

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
		</>
	);
}
