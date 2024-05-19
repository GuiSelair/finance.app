import React from 'react';
import { Link as LinkIcon } from 'phosphor-react';
import Link from 'next/link';

import { BaseModal } from '@/components/BaseModal';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { formatCurrency } from '@/helpers/formatCurrency';
import { dateFormat } from '@/helpers/dateFormat';
import { formatParcel } from '@/helpers/formatParcel';

import {
	DeleteExpenseIcon,
	Divider,
	ExpenseAmountDetails,
	ExpenseAmountDetailsItem,
	ExpenseBaseDetails,
	ExpenseCard,
	ExpenseDescription,
	ExpenseDescriptionAndCardDetails,
	ExpensePaidIcon,
	RemoveExpenseButton,
} from './ExpenseDetailsModal.styles';

export interface IDeleteExpenseResponse {
	isDeleting: boolean;
	executeDelete: () => Promise<void>;
}

interface IExpenseDetailsModalProps {
	isOpenModal: boolean;
	onClose: () => void;
	expenseInMonth: ExpenseInMonth | null;
	deleteExpense: (expenseId: string) => IDeleteExpenseResponse;
}

export default function ExpenseDetailsModal({
	expenseInMonth,
	isOpenModal,
	onClose,
	deleteExpense,
}: Readonly<IExpenseDetailsModalProps>) {
	if (!expenseInMonth) return null;

	const { expense } = expenseInMonth;
	const { executeDelete, isDeleting } = deleteExpense(
		expenseInMonth?.expenseId,
	);

	const expenseTotalAmountFormatted = formatCurrency(expense?.amount);
	const expenseParcelAmountFormatted = formatCurrency(
		expenseInMonth?.valueParcel,
	);
	const parcelsFormatted = formatParcel(
		expenseInMonth?.currentParcel,
		expenseInMonth?.quantityParcel,
	);
	const expenseCreatedAtFormatted = dateFormat(
		new Date(expense?.createdAt ?? new Date()),
		'dd/MM/yyyy',
	);
	const expenseIdCut = `${expenseInMonth?.expenseId?.slice(0, 20)}...`;

	async function handleDeleteExpense() {
		if (!expenseInMonth?.expenseId) return null;
		executeDelete();
		onClose();
	}

	function makeParcelSection() {
		if (expense?.isRecurring) {
			return (
				<ExpenseAmountDetailsItem>
					<span>Despesa</span>
					<strong>FIXA</strong>
				</ExpenseAmountDetailsItem>
			);
		}

		return (
			<ExpenseAmountDetailsItem>
				<span>Parcela</span>
				<strong>{parcelsFormatted}</strong>
			</ExpenseAmountDetailsItem>
		);
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
					<p>{expenseIdCut}</p>
				</div>
				<div>
					<span>Nome</span>
					<p>{expense?.name}</p>
				</div>
				<div>
					<span>Despesa paga?</span>
					<p>
						<ExpensePaidIcon isPaid={expenseInMonth?.isPaid ?? false} />
					</p>
				</div>
				<div>
					<span>Remover?</span>
					<RemoveExpenseButton
						size="xs"
						onClick={handleDeleteExpense}
						isLoading={isDeleting}
					>
						<DeleteExpenseIcon />
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
				{makeParcelSection()}
				<ExpenseAmountDetailsItem>
					<span>Criada em</span>
					<p>{expenseCreatedAtFormatted}</p>
				</ExpenseAmountDetailsItem>
			</ExpenseAmountDetails>
			<Divider />
			<ExpenseDescriptionAndCardDetails>
				<ExpenseDescription>
					<span>Descrição</span>
					<p>{expense?.description ?? '--'}</p>
				</ExpenseDescription>
				<ExpenseCard>
					<span>Vinculado ao</span>
					<div>
						<p>{expense?.card?.name}</p>
						<Link href="/cards/totalizers">
							<button type="button">
								<LinkIcon weight="bold" />
							</button>
						</Link>
					</div>
				</ExpenseCard>
			</ExpenseDescriptionAndCardDetails>
		</BaseModal>
	);
}