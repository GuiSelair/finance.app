import React from 'react';
import { Link as LinkIcon } from 'phosphor-react';
import Link from 'next/link';

import { Flex, Text, BaseModal, Currency } from '@/components';
import { ExpenseInMonth } from '@/models/ExpenseInMonth';
import { formatCurrency } from '@/helpers/formatCurrency';
import { dateFormat } from '@/helpers/dateFormat';
import { formatParcel } from '@/helpers/formatParcel';

import {
	ExpenseAmountDetails,
	ExpenseAmountDetailsItem,
	ExpenseBaseDetails,
	ExpenseCard,
	ExpenseDescription,
	ExpenseDescriptionAndCardDetails,
	ExpensePaidIcon,
	SharedExpensesTitle,
} from './ExpenseDetailsModal.styles';

interface IExpenseDetailsModalProps {
	isOpenModal: boolean;
	onClose: () => void;
	expenseInMonth: ExpenseInMonth | null;
}

export default function ExpenseDetailsModal({
	expenseInMonth,
	isOpenModal,
	onClose,
}: Readonly<IExpenseDetailsModalProps>) {
	if (!expenseInMonth) return null;

	const { expense } = expenseInMonth;

	const expenseTotalAmountFormatted = formatCurrency(expense?.amount);
	const expenseParcelAmountFormatted = formatCurrency(expenseInMonth?.valueParcel);
	const parcelsFormatted = formatParcel(expenseInMonth?.currentParcel, expenseInMonth?.quantityParcel);
	const expenseCreatedAtFormatted = dateFormat(new Date(expense?.createdAt ?? new Date()), 'dd/MM/yyyy');
	const expenseIdCut = `${expenseInMonth?.expenseId?.slice(0, 20)}...`;
	const isSharedExpense = (expenseInMonth?.sharedExpenses?.length ?? 0) > 0;
	const youMustPay = expenseInMonth?.sharedExpenses?.reduce((acc, sharedExpense) => acc + sharedExpense.total, 0) ?? 0;

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
		<BaseModal open={isOpenModal} onClose={onClose} title="Mais detalhes da despesa">
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
			{isSharedExpense && (
				<Flex flexDirection="column" gap="0.5rem">
					<SharedExpensesTitle size="semi-medium">Divisões</SharedExpensesTitle>

					<Flex flexDirection="column" gap="0.5rem">
						<Flex alignItems="center" justifyContent="space-between" width="100%" gap="0.5rem">
							<Text textAlign="left" color="gray300">
								Você
							</Text>
							<Flex alignItems="center" gap="1rem">
								<Currency value={youMustPay} weight="500" color="gray300" />
							</Flex>
						</Flex>
						{expenseInMonth?.sharedExpenses?.map(sharedExpense => (
							<Flex
								key={sharedExpense.person.id}
								alignItems="center"
								justifyContent="space-between"
								width="100%"
								gap="0.5rem"
							>
								<Text textAlign="left">{sharedExpense.person.name}</Text>
								<Flex alignItems="center" gap="1rem">
									<Currency value={sharedExpense.total} weight="500" />
								</Flex>
							</Flex>
						))}
					</Flex>
				</Flex>
			)}
		</BaseModal>
	);
}
