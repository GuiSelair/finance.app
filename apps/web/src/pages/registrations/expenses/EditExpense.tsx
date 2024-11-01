import React from 'react';
import { FormProvider } from 'react-hook-form';

import { LayoutBox } from '@/components/LayoutBox';
import { TextInput, InputLabel, ActionButtons, Row, Column } from '@/components/Form';
import { SEO } from '@/components/SEO';

import { PaymentMethodSelectionSection } from './components/PaymentMethodSelection';
import { useEditExpense } from './hooks/useEditExpense';
import { RegisterExpenseForm, Divider, ValueInput } from './ExpenseForm.styles';

export default function EditExpensePage() {
	const { editExpenseSubmit, goBack, isEditing, formSchema } = useEditExpense();

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = formSchema;

	return (
		<FormProvider {...formSchema}>
			<SEO title="Edição de despesa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Editar despesa</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<RegisterExpenseForm>
						<Row>
							<InputLabel>
								Nome:
								<TextInput
									placeholder="Insira o nome de sua despesa aqui"
									error={errors.name?.message}
									{...register('name')}
								/>
							</InputLabel>
						</Row>
						<PaymentMethodSelectionSection isEditMode />

						<Divider />

						<Row margin="0 0 100px 0">
							<Column width="600px">
								<Row gap="0.5rem">
									<InputLabel>
										Valor total:
										<ValueInput
											prefix="R$"
											error={errors.totalValue?.message}
											disabled
											{...register('totalValue', {
												valueAsNumber: true,
											})}
										/>
									</InputLabel>
									<InputLabel>
										Parcelas:
										<ValueInput
											error={errors.parcelQuantity?.message}
											disabled
											{...register('parcelQuantity', {
												valueAsNumber: true,
											})}
										/>
									</InputLabel>
									<InputLabel>
										Valor por parcela:
										<ValueInput prefix="R$" {...register('parcelValue')} />
									</InputLabel>
									<InputLabel>
										Despesa fixa:
										<TextInput type="checkbox" {...register('isRecurring')} />
									</InputLabel>
								</Row>
							</Column>
						</Row>
					</RegisterExpenseForm>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={goBack} />
							<ActionButtons.Submit
								onClick={handleSubmit(editExpenseSubmit)}
								isLoading={isEditing}
								isDisabled={!isDirty}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Editar despesa
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</FormProvider>
	);
}
