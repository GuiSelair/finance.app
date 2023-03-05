import { MagnifyingGlass, Funnel, ArrowCircleDown } from 'phosphor-react';
import { useMemo } from 'react';

import { Input } from '@/components/shared/Form/Input';
import Table from '@/components/shared/Table';

import {
	FilterButton,
	FilterContainer,
	ShowExpenseDetailButton,
} from './styles';
import useFetch from '@/hooks/useFetch';

interface ExpensesTableDataProps {
	id: string;
	description: string;
	card: string;
	parcel: string;
	parcel_amount: string;
	is_shared: string;
	options: string | React.ReactNode;
}

const data = [
	{
		id: '03b18257-d0e4...',
		description: 'Iphone 13 - Dani',
		card: 'Nubank',
		parcel: '01/10',
		parcel_amount: 'R$569,90',
		is_shared: 'Sim',
		peoples: [{ test: 1212 }],
	},
	{
		id: '03b18257-d0e4...',
		description: 'Iphone 13 - Dani',
		card: 'Nubank',
		parcel: '01/10',
		parcel_amount: 'R$569,90',
		is_shared: 'Não',
	},
	{
		id: '03b18257-d0e4...',
		description: 'Iphone 13 - Dani',
		card: 'Nubank',
		parcel: '01/10',
		parcel_amount: 'R$569,90',
		is_shared: 'Sim',
	},
];

export default function ExpensesTable() {
	const { data, error } = useFetch('/expenses/list', {
		body: {
			month: 12,
			year: 2022,
		},
	});

	const expenses: ExpensesTableDataProps[] = useMemo(() => {
		return data.map(expense => ({
			id: expense.id,
			description: expense.description,
			card: expense.card,
			parcel: expense.parcel,
			parcel_amount: expense.parcel_amount,
			is_shared: expense.is_shared,
			options: (
				<ShowExpenseDetailButton
					type="button"
					onClick={() => console.log(expense)}
				>
					Ver mais detalhes
				</ShowExpenseDetailButton>
			),
		}));
	}, []);

	const columns = useMemo(
		() => [
			{
				Header: 'Chave ID',
				accessor: 'id',
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
				Header: 'Parcelas',
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
