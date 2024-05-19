import { useMemo, useState } from 'react';
import {
	MagnifyingGlass as MagnifyingGlassIcon,
	Funnel as FunnelIcon,
	ArrowCircleDown as ArrowCircleDownIcon,
	DotsThreeOutlineVertical as DotsThreeOutlineVerticalIcon,
} from 'phosphor-react';

import { TextInput } from '@/components/Form/TextInput';
import { Table, Spinner, Box, Button } from '@/components';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { formatCurrency } from '@/helpers/formatCurrency';
import { formatParcel } from '@/helpers/formatParcel';

import {
	ExpenseDetailsModal,
	IDeleteExpenseResponse,
} from '../ExpenseDetailsModal';
import { expensesTableColumns } from '../../constants/tableColumns';

import { FilterButton, FilterContainer } from './ExpensesTable.styles';

export interface IExpensesTableData {
	name: string;
	card: string;
	parcel: string;
	parcelAmount: string;
	isShared: boolean;
	isRecurring: boolean;
	options: JSX.Element | string;
}

export interface IFetchExpensesResponse {
	isFetchingExpenses: boolean;
	expensesInMonth?: ExpenseInMonth[];
}
interface IExpensesTableProps {
	fetchExpenses: () => IFetchExpensesResponse;
	deleteExpense: (expenseId: string) => IDeleteExpenseResponse;
}

export default function ExpensesTable({
	fetchExpenses,
	deleteExpense,
}: Readonly<IExpensesTableProps>) {
	const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<ExpenseInMonth | null>(
		null,
	);
	const { isFetchingExpenses, expensesInMonth } = fetchExpenses();

	function handleSelectExpense(expenseInMonth: ExpenseInMonth) {
		setSelectedExpense(expenseInMonth);
		setIsOpenExpenseModal(true);
	}

	const expensesTableData = useMemo<IExpensesTableData[]>(() => {
		if (!expensesInMonth) return [];

		return expensesInMonth.map(expenseInMonth => {
			const { expense, quantityParcel, currentParcel, valueParcel } =
				expenseInMonth;

			return {
				name: expense?.name,
				card: expense?.card?.name,
				parcel: formatParcel(currentParcel, quantityParcel),
				parcelAmount: formatCurrency(valueParcel),
				isShared: expense?.isSplitedExpense,
				isRecurring: expense?.isRecurring,
				options: (
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => handleSelectExpense(expenseInMonth)}
					>
						<DotsThreeOutlineVerticalIcon weight="fill" />
						Detalhes
					</Button>
				),
			};
		});
	}, [expensesInMonth]);

	if (isFetchingExpenses) {
		return (
			<Box alignItems="center" justifyContent="center" width="100%">
				<Spinner size="md" mode="dark" />
			</Box>
		);
	}

	return (
		<>
			<FilterContainer>
				<TextInput
					icon={() => <MagnifyingGlassIcon size={24} />}
					placeholder="Pesquise pelo nome da despesa"
				/>
				<FilterButton>
					<FunnelIcon size={24} />
					Filtros
				</FilterButton>
				<FilterButton>
					<ArrowCircleDownIcon size={24} />
					Exportar
				</FilterButton>
			</FilterContainer>
			<Table columns={expensesTableColumns} data={expensesTableData} />
			<ExpenseDetailsModal
				isOpenModal={isOpenExpenseModal}
				onClose={() => setIsOpenExpenseModal(false)}
				expenseInMonth={selectedExpense}
				deleteExpense={deleteExpense}
			/>
		</>
	);
}
