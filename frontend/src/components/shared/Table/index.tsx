/* eslint-disable react/jsx-key */
import { useMemo } from 'react';
import { Column, useTable } from 'react-table';

import { TableContainer } from './styles';

interface ExpensesTableDataProps {
	id: string;
	description: string;
	card: string;
	parcel: string;
	parcel_amount: string;
	shared_with: string;
	amount_per_share: string;
	options: string;
}

export default function Table() {
	const data: ExpensesTableDataProps[] = useMemo(
		() => [
			{
				id: '03b18257-d0e4...',
				description: 'Iphone 13 - Dani',
				card: 'Nubank',
				parcel: '01/10',
				parcel_amount: 'R$569,90',
				shared_with: 'Guilherme',
				amount_per_share: 'Eu: R$369,90',
				options: 'dsad',
			},
			{
				id: '03b18257-d0e4...',
				description: 'Iphone 13 - Dani',
				card: 'Nubank',
				parcel: '01/10',
				parcel_amount: 'R$569,90',
				shared_with: 'Guilherme',
				amount_per_share: 'Eu: R$369,90',
				options: 'dsad',
			},
			{
				id: '03b18257-d0e4...',
				description: 'Iphone 13 - Dani',
				card: 'Nubank',
				parcel: '01/10',
				parcel_amount: 'R$569,90',
				shared_with: 'Guilherme',
				amount_per_share: 'Eu: R$369,90',
				options: 'dsad',
			},
		],
		[],
	);

	const columns: Array<Column<ExpensesTableDataProps>> = useMemo(
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
				Header: 'Dividida com',
				accessor: 'shared_with',
			},
			{
				Header: 'Valor de cada divisão',
				accessor: 'amount_per_share',
			},
			{
				Header: 'Opções',
				accessor: 'options',
			},
		],
		[],
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<TableContainer {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
							})}
						</tr>
					);
				})}
			</tbody>
		</TableContainer>
	);
}
