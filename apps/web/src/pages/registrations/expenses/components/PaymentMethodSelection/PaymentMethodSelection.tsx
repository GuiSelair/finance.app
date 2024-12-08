import { useMemo } from 'react';
import Link from 'next/link';
import { ArrowSquareOut as ArrowSquareOutIcon } from 'phosphor-react';
import { useFormContext, Controller } from 'react-hook-form';

import { InputLabel, Select, GridColumn, TextInput } from '@/components/Form';
import { FieldDescription } from './PaymentMethodSelection.styles';
import { useListCardsApi } from '@/hooks/api/cards/useListCards.api';
import { FormExpenseFieldsType } from '../../constants/formSchema';

interface PaymentMethodSelectionSectionProps {
	isEditMode?: boolean;
}

export default function PaymentMethodSelectionSection({ isEditMode }: PaymentMethodSelectionSectionProps) {
	const { data: userAllPaymentMethods, isLoading } = useListCardsApi();
	const { control, register } = useFormContext<FormExpenseFieldsType>();

	const maxDateLimit = new Date().toISOString().split('T')[0];

	const paymentMethodsOptions = useMemo(() => {
		if (!userAllPaymentMethods?.length) return;

		return userAllPaymentMethods?.map(card => ({
			label: card.name,
			value: card.id,
		}));
	}, [userAllPaymentMethods]);

	return (
		<GridColumn gridTemplateColumns="200px 418px 1fr" margin="0.5rem 0 0 0" gap="1.5rem">
			<InputLabel>
				Data de compra:
				<TextInput type="date" max={maxDateLimit} {...register('purchaseDate')} disabled={isEditMode} />
			</InputLabel>
			<InputLabel>
				Data da despesa:
				<TextInput type="month" {...register('expenseDate')} disabled={isEditMode} />
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
		</GridColumn>
	);
}
