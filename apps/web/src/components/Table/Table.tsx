/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { TableContainer } from './Table.styles';

export type TableColumnsProps = ColumnDef<any, any>[];

interface TableProps {
	columns: TableColumnsProps;
	data: any[];
}

export function Table({ columns, data }: Readonly<TableProps>) {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<TableContainer>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<th
								key={header.id}
								style={{
									width: header.getSize(),
								}}
							>
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => (
					<tr key={row.id}>
						{row.getVisibleCells().map(cell => (
							<td key={cell.id} style={{ width: cell.column.getSize() }}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</TableContainer>
	);
}
