import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { ArrowSquareOut } from 'phosphor-react';
import { useFormContext, Controller } from 'react-hook-form';

import {
	InputLabel,
	Select,
	SelectOptionProps,
	Row,
	Column,
} from '@/components/Form';
import { Card } from '@/models/Card';
import { httpClient } from '@/providers/HTTPClient';
import { CardDetails, FieldDescription } from './styles';

export function PaymentMethodSelectionSection() {
	const [paymentMethodOptionSelected, setPaymentMethodOptionSelected] =
		useState<SelectOptionProps | null>(null);
	const { data: userAllPaymentMethods, isError } = useQuery(
		'payment-methods',
		async () => {
			const { data } = await httpClient.get<{ cards: Card[] }>('/cards/list');
			return data.cards;
		},
	);
	const { control } = useFormContext();

	const paymentMethodsOptions = useMemo(() => {
		if (!userAllPaymentMethods?.length) return;

		return userAllPaymentMethods?.map(card => ({
			label: card.name,
			value: card.id,
		}));
	}, [userAllPaymentMethods]);

	const makeMessageOfWitchMonthWillBeTheExpense = (paymentMethodId: string) => {
		const userPaymentMethodSelected = userAllPaymentMethods?.find(
			card => card.id === paymentMethodId,
		);
		if (!userPaymentMethodSelected) return;

		const { turning_day } = userPaymentMethodSelected;
		const currentDay = new Date().getDate();
		if (turning_day < currentDay) {
			return `deste mês (${String(new Date().getMonth() + 2).padStart(
				2,
				'0',
			)}/${new Date().getFullYear()})`;
		}

		return `do próximo mês (${String(new Date().getMonth() + 3).padStart(
			2,
			'0',
		)}/${new Date().getFullYear()})`;
	};

	if (isError) {
		toast.error(
			'Ocorreu um erro ao carregar os meios de pagamento. Tente novamente mais tarde.',
		);
		return null;
	}

	return (
		<Row margin="0.5rem 0 0 0">
			<Column width="418px">
				<InputLabel>
					Meio de pagamento:
					<div>
						{/* TODO: Refatorar */}
						<Controller
							name="paymentMethod"
							control={control}
							render={({ field }) => (
								<Select
									isLoading={!paymentMethodsOptions}
									placeholder="Selecione o meio de pagamento"
									options={paymentMethodsOptions ?? []}
									value={paymentMethodOptionSelected}
									onChange={value => {
										setPaymentMethodOptionSelected(value as SelectOptionProps);
										field.onChange(value);
									}}
								/>
							)}
						/>
						{/* <Select
							isLoading={!paymentMethodsOptions}
							placeholder="Selecione o meio de pagamento"
							options={paymentMethodsOptions ?? []}
							value={paymentMethodOptionSelected}
							onChange={(value) => setPaymentMethodOptionSelected(value as SelectOptionProps)}
						/> */}
						<FieldDescription>
							Não encontrou o meio de pagamento?
							<strong>
								<Link href={'/add/cards'} prefetch={false}>
									Crie um aqui!
									<ArrowSquareOut />
								</Link>
							</strong>
						</FieldDescription>
					</div>
				</InputLabel>
			</Column>

			{paymentMethodOptionSelected && (
				<CardDetails>
					<span>Detalhes sobre o meio de pagamento:</span>
					<Row>
						<p>
							Cartão: <strong>{paymentMethodOptionSelected.label}</strong> |
							Esta despesa entrará na fatura{' '}
							<strong>
								{makeMessageOfWitchMonthWillBeTheExpense(
									paymentMethodOptionSelected.value,
								)}
							</strong>
						</p>
					</Row>
				</CardDetails>
			)}
		</Row>
	);
}
