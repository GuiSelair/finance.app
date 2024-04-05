import React from 'react';
import { CheckCircle, Link as LinkIcon, Trash } from 'phosphor-react';
import Link from 'next/link';

import { BaseModal } from '@/components/BaseModal';
import { ExpenseInMonth } from '@/models/expenseInMonth';
import { defaultTheme } from '@/styles/theme/default';
import { formatCurrency } from '@/helpers/formatCurrency';
import { dateFormat } from '@/helpers/dateFormat';
import { useDeleteExpenseApi } from '@/hooks/api/useDeleteExpenseApi';

import {
	Divider,
	ExpenseAmountDetails,
	ExpenseAmountDetailsItem,
	ExpenseBaseDetails,
	ExpenseCard,
	ExpenseDescription,
	ExpenseDescriptionAndCardDetails,
	ExpenseSplitDetails,
	RemoveExpenseButton,
} from './ExpenseDetailsModal.styles';

interface ExpenseDetailsModalProps {
	isOpenModal: boolean;
	onClose: () => void;
	expense: ExpenseInMonth;
	month: number;
	year: number;
}

export function ExpenseDetailsModal({
	expense,
	isOpenModal,
	onClose,
	month,
	year,
}: ExpenseDetailsModalProps) {
	const { mutateAsync, isLoading: isDeleting } = useDeleteExpenseApi(
		expense.expense_id,
	);
	if (!expense) return null;

	const expenseTotalAmountFormatted = formatCurrency(expense?.expense?.amount);
	const expenseParcelAmountFormatted = formatCurrency(expense?.value_of_parcel);
	const parcels = `${String(expense?.number_current_of_parcel).padStart(
		2,
		'0',
	)} / ${String(expense?.number_total_of_parcel).padStart(2, '0')}`;
	const expenseCreatedAtFormatted = dateFormat(
		new Date(expense.created_at),
		'dd/MM/yyyy',
	);

	function handleDeleteExpense() {
		mutateAsync({});
		onClose();
	}

	return (
		<BaseModal
			open={isOpenModal}
			onClose={onClose}
			title="Mais detalhes da despesa"
		>
			<ExpenseBaseDetails>
				<div>
					<span>Chave ID</span>
					<p>{expense?.expense_id?.slice(0, 20)}...</p>
				</div>
				<div>
					<span>Nome</span>
					<p>{expense?.expense?.name ?? 'Nome não especificado'}</p>
				</div>
				<div>
					<span>Paga?</span>
					<p>
						<CheckCircle
							weight="fill"
							color={
								expense?.isPaid
									? defaultTheme.colors.green800
									: defaultTheme.colors.gray200
							}
						/>
					</p>
				</div>
				<div>
					<span>Remover?</span>
					<RemoveExpenseButton
						size="xs"
						onClick={handleDeleteExpense}
						isLoading={isDeleting}
					>
						<Trash weight="fill" color={defaultTheme.colors.red500} />
					</RemoveExpenseButton>
				</div>
			</ExpenseBaseDetails>
			<ExpenseAmountDetails>
				<ExpenseAmountDetailsItem>
					<span>Valor total</span>
					<p>{expenseTotalAmountFormatted}</p>
				</ExpenseAmountDetailsItem>
				<ExpenseAmountDetailsItem>
					<span>Valor da parcela</span>
					<strong>{expenseParcelAmountFormatted}</strong>
				</ExpenseAmountDetailsItem>
				{expense?.expense?.is_recurring ? (
					<ExpenseAmountDetailsItem>
						<span>Despesa</span>
						<strong>FIXA</strong>
					</ExpenseAmountDetailsItem>
				) : (
					<ExpenseAmountDetailsItem>
						<span>Parcela</span>
						<strong>{parcels}</strong>
					</ExpenseAmountDetailsItem>
				)}
				<ExpenseAmountDetailsItem>
					<span>Criada em</span>
					<p>{expenseCreatedAtFormatted}</p>
				</ExpenseAmountDetailsItem>
			</ExpenseAmountDetails>
			<Divider />
			<ExpenseDescriptionAndCardDetails>
				<ExpenseDescription>
					<span>Descrição</span>
					<p>{expense?.expense?.description ?? '--'}</p>
				</ExpenseDescription>
				<ExpenseCard>
					<span>Vinculado ao</span>
					<div>
						<p>{expense?.expense?.card?.name}</p>
						<Link href="/cards/totalizers">
							<button type="button">
								<LinkIcon weight="bold" />
							</button>
						</Link>
					</div>
				</ExpenseCard>
			</ExpenseDescriptionAndCardDetails>
			<ExpenseSplitDetails></ExpenseSplitDetails>
		</BaseModal>
	);
}
