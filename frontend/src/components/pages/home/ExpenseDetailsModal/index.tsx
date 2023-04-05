import React from 'react';
import { CheckCircle, Link } from 'phosphor-react';

import { BaseModal } from '@/components/shared/BaseModal';
import { ExpenseInMonth } from '@/models/expenseInMonth';
import { defaultTheme } from '@/styles/theme/default';
import { formatCurrency } from 'helpers/formatCurrency';
import { dateFormat } from 'helpers/dateFormat';

import {
	Divider,
	ExpenseAmountDetails,
	ExpenseAmountDetailsItem,
	ExpenseBaseDetails,
	ExpenseCard,
	ExpenseDescription,
	ExpenseDescriptionAndCardDetails,
	ExpenseSplitDetails,
} from './styles';

interface ExpenseDetailsModalProps {
	isOpenModal: boolean;
	onClose: () => void;
	expense: ExpenseInMonth;
}

export function ExpenseDetailsModal({
	expense,
	isOpenModal,
	onClose,
}: ExpenseDetailsModalProps) {
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
				<ExpenseAmountDetailsItem>
					<span>Parcela</span>
					<strong>{parcels}</strong>
				</ExpenseAmountDetailsItem>
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
						<p>Nubank</p>
						<button type="button">
							<Link weight="bold" />
						</button>
					</div>
				</ExpenseCard>
			</ExpenseDescriptionAndCardDetails>
			<ExpenseSplitDetails></ExpenseSplitDetails>
		</BaseModal>
	);
}
