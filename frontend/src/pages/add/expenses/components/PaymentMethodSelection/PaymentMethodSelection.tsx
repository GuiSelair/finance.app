import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowSquareOut as ArrowSquareOutIcon } from 'phosphor-react';
import { useFormContext, Controller } from 'react-hook-form';
import { isBefore } from 'date-fns';

import { InputLabel, Select, Row, Column } from '@/components/Form';
import { CardDetails, FieldDescription } from './PaymentMethodSelection.styles';
import { useListCardsApi } from '@/hooks/api/useListCards.api';
import { CreateExpenseFieldsType } from '../../constants/formSchema';

export function PaymentMethodSelectionSection() {
	const { data: userAllPaymentMethods } = useListCardsApi();
	const { control, watch } = useFormContext<CreateExpenseFieldsType>();
	const paymentMethodOptionSelected = watch('paymentMethod') ?? undefined;

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
		const currentMonth = new Date().getMonth();
		const currentYear = new Date().getFullYear();

		const turningDate = new Date(currentYear, currentMonth, turning_day);
		const purchaseDate = new Date();

		if (isBefore(purchaseDate, turningDate)) {
			return `deste mês (${String(new Date().getMonth() + 1).padStart(
				2,
				'0',
			)}/${new Date().getFullYear()})`;
		}

		return `do próximo mês (${String(new Date().getMonth() + 2).padStart(
			2,
			'0',
		)}/${new Date().getFullYear()})`;
	};

	return (
		<Row margin="0.5rem 0 0 0">
			<Column width="418px">
				<InputLabel>
					Meio de pagamento:
					<div>
						<Controller
							name="paymentMethod"
							control={control}
							render={({ field }) => (
								<Select
									isLoading={!paymentMethodsOptions}
									placeholder="Selecione o meio de pagamento"
									options={paymentMethodsOptions ?? []}
									{...field}
								/>
							)}
						/>
						<FieldDescription>
							Não encontrou o meio de pagamento?{' '}
							<strong>
								<Link href={'/add/cards'} prefetch={false}>
									Crie um aqui!
									<ArrowSquareOutIcon />
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
