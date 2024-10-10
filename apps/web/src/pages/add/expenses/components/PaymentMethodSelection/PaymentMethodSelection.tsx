import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowSquareOut as ArrowSquareOutIcon } from 'phosphor-react';
import { useFormContext, Controller } from 'react-hook-form';
import { calculateExpenseMonth } from '@finance-app/helpers';

import { InputLabel, Select, Row, Column } from '@/components/Form';
import { CardDetails, FieldDescription } from './PaymentMethodSelection.styles';
import { useListCardsApi } from '@/hooks/api/useListCards.api';
import { CreateExpenseFieldsType } from '../../constants/formSchema';

export default function PaymentMethodSelectionSection() {
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

		const { turningDay } = userPaymentMethodSelected;
		const purchaseDate = new Date();
		const { isInCurrentMonth, month } = calculateExpenseMonth(
			purchaseDate,
			turningDay,
		);
		const monthStartInOne = month + 1;

		if (isInCurrentMonth) {
			return `deste mês (${String(monthStartInOne).padStart(
				2,
				'0',
			)}/${purchaseDate.getFullYear()})`;
		}

		return `do próximo mês (${String(monthStartInOne).padStart(
			2,
			'0',
		)}/${purchaseDate.getFullYear()})`;
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
