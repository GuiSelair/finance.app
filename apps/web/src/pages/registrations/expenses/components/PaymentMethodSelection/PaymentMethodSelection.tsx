import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowSquareOut as ArrowSquareOutIcon } from 'phosphor-react';
import { useFormContext, Controller } from 'react-hook-form';
import { calculateExpenseMonth } from '@finance-app/helpers';

import { InputLabel, Select, GridColumn, TextInput } from '@/components/Form';
import { Box } from '@/components';
import { CardDetails, FieldDescription } from './PaymentMethodSelection.styles';
import { useListCardsApi } from '@/hooks/api/cards/useListCards.api';
import { FormExpenseFieldsType } from '../../constants/formSchema';

interface PaymentMethodSelectionSectionProps {
	isEditMode?: boolean;
}

export default function PaymentMethodSelectionSection({ isEditMode }: PaymentMethodSelectionSectionProps) {
	const { data: userAllPaymentMethods, isLoading } = useListCardsApi();
	const { control, watch, register } = useFormContext<FormExpenseFieldsType>();

	const paymentMethodOptionSelected = watch('paymentMethod') ?? undefined;
	const purchaseDateSelected = watch('purchaseDate') || new Date();
	const maxDateLimit = new Date().toISOString().split('T')[0];

	const paymentMethodsOptions = useMemo(() => {
		if (!userAllPaymentMethods?.length) return;

		return userAllPaymentMethods?.map(card => ({
			label: card.name,
			value: card.id,
		}));
	}, [userAllPaymentMethods]);

	function makeMessageOfWitchMonthWillBeTheExpense(paymentMethodId: string) {
		const userPaymentMethodSelected = userAllPaymentMethods?.find(card => card.id === paymentMethodId);
		if (!userPaymentMethodSelected) return;

		const { turningDay } = userPaymentMethodSelected;
		const purchaseDate = new Date(purchaseDateSelected);
		const { isInCurrentMonth, month } = calculateExpenseMonth(purchaseDate, turningDay);
		const monthStartInOne = month + 2;
		const monthWithYearFormatted = `${String(monthStartInOne).padStart(2, '0')}/${purchaseDate.getFullYear()}`;

		return isInCurrentMonth
			? `deste mês (Vencimento em: ${monthWithYearFormatted})`
			: `do próximo mês (Vencimento em: ${monthWithYearFormatted})`;
	}

	return (
		<GridColumn gridTemplateColumns="200px 418px 1fr" margin="0.5rem 0 0 0" gap="1.5rem">
			<InputLabel>
				Data de compra:
				<TextInput type="date" max={maxDateLimit} {...register('purchaseDate')} disabled={isEditMode} />
			</InputLabel>
			<InputLabel>
				Meio de pagamento:
				<div>
					<Controller
						name="paymentMethod"
						control={control}
						render={({ field }) => (
							<Select
								isLoading={isLoading}
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

			{paymentMethodOptionSelected && (
				<CardDetails>
					<span>Detalhes sobre o meio de pagamento:</span>
					<Box>
						<p>
							Cartão: <strong>{paymentMethodOptionSelected.label}</strong> | Esta despesa entrará na fatura{' '}
							<strong>{makeMessageOfWitchMonthWillBeTheExpense(paymentMethodOptionSelected.value)}</strong>
						</p>
					</Box>
				</CardDetails>
			)}
		</GridColumn>
	);
}
