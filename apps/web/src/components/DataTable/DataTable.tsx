import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableCell, TableHeadCell, TableRow } from './DataTable.styles';

export type DataTableColumn<TData, TValue = unknown> = ColumnDef<TData, TValue>[];

export interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Table>
			<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<TableHeadCell
								key={header.id}
								style={{
									width: header.getSize(),
								}}
							>
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</TableHeadCell>
						))}
					</TableRow>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map(row => (
					<TableRow key={row.id}>
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))}
			</tbody>
		</Table>
	);
}
