import { useMemo, useState } from 'react';
import {
	MagnifyingGlass as MagnifyingGlassIcon,
	TrashSimple as TrashIcon,
	PencilSimple as PencilSimpleIcon,
} from 'phosphor-react';
import Link from 'next/link';

import { DataTable, Spinner, Flex, Button } from '@/components';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { formatCurrency } from '@/helpers/formatCurrency';
import { formatParcel } from '@/helpers/formatParcel';
import { useModal } from '@/hooks/useModal';

import { expensesTableColumns } from '../../constants/tableColumns';
import type { DeleteExpenseFunction, FetchExpensesFunction } from '../../hooks/useDashboard';
import { ConfirmDeleteExpenseModal } from '../ConfirmDeleteExpenseModal';
import { ExpenseDetailsModal } from '../ExpenseDetailsModal';
import { DeleteOptionButton, OptionButtonsContainer } from './ExpensesTable.styles';
import { ExpensesFilters } from './components/ExpensesTableFilters';

export interface IExpensesTableData {
	name: string;
	card: string;
	parcel: string;
	parcelAmount: string;
	isShared: boolean;
	isRecurring: boolean;
	options: JSX.Element | string;
}

interface IExpensesTableProps {
	fetchExpenses: FetchExpensesFunction;
	deleteExpense: DeleteExpenseFunction;
}

export default function ExpensesTable({ fetchExpenses, deleteExpense }: Readonly<IExpensesTableProps>) {
	const [isOpenExpenseDetailsModal, setIsOpenExpenseDetailsModal] = useState(false);
	const [selectedExpense, setSelectedExpense] = useState<ExpenseInMonth | null>(null);

	const confirmDeleteExpenseModal = useModal(false);
	const { isFetchingExpenses, expensesInMonth } = fetchExpenses();

	function handleSelectExpense(expenseInMonth: ExpenseInMonth) {
		setSelectedExpense(expenseInMonth);
		setIsOpenExpenseDetailsModal(true);
	}

	const expensesTableData = useMemo<IExpensesTableData[]>(() => {
		if (!expensesInMonth) return [];

		return expensesInMonth.map(expenseInMonth => {
			const { expense, quantityParcel, currentParcel, valueParcel, id } = expenseInMonth;

			return {
				name: expense?.name,
				card: expense?.card?.name,
				parcel: formatParcel(currentParcel, quantityParcel),
				parcelAmount: formatCurrency(valueParcel),
				isShared: expense?.isSplitedExpense,
				isRecurring: expense?.isRecurring,
				options: (
					<OptionButtonsContainer>
						<Button
							aria-label="Ver detalhes da despesa"
							title="Ver detalhes da despesa"
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => handleSelectExpense(expenseInMonth)}
						>
							<MagnifyingGlassIcon />
						</Button>
						<Link
							href={`/registrations/expenses/${id}`}
							tabIndex={-1}
							aria-label="Editar despesa"
							title="Editar despesa"
						>
							<Button type="button" variant="ghost" size="sm">
								<PencilSimpleIcon />
							</Button>
						</Link>
						<DeleteOptionButton
							aria-label="Remover despesa"
							title="Remover despesa"
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => {
								setSelectedExpense(expenseInMonth);
								confirmDeleteExpenseModal.open();
							}}
						>
							<TrashIcon />
						</DeleteOptionButton>
					</OptionButtonsContainer>
				),
			};
		});
	}, [expensesInMonth]);

	if (isFetchingExpenses) {
		return (
			<Flex alignItems="center" justifyContent="center" width="100%">
				<Spinner size="md" mode="dark" />
			</Flex>
		);
	}

	return (
		<>
			<ExpensesFilters />
			<DataTable columns={expensesTableColumns} data={expensesTableData} />
			<ExpenseDetailsModal
				isOpenModal={isOpenExpenseDetailsModal}
				onClose={() => setIsOpenExpenseDetailsModal(false)}
				expenseInMonth={selectedExpense}
			/>
			<ConfirmDeleteExpenseModal
				isOpen={confirmDeleteExpenseModal.isOpen}
				onClose={confirmDeleteExpenseModal.close}
				onDeleteExpense={deleteExpense}
				expense={selectedExpense}
			/>
		</>
	);
}
