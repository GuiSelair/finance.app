import React from 'react';
import { FormProvider } from 'react-hook-form';

import { LayoutBox } from '@/components/LayoutBox';
import { TextInput, InputLabel, ActionButtons, Row, Column } from '@/components/Form';
import { SEO } from '@/components/SEO';

import { PaymentMethodSelectionSection } from './components/PaymentMethodSelection';
import { useCreateExpense } from './hooks/useCreateExpense';
import { RegisterExpenseForm, Divider, ValueInput } from './ExpenseForm.styles';

export function CreateExpensePage() {
	const { createExpenseSubmit, goBack, isCreatingExpense, formSchema, parcelValue } = useCreateExpense();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = formSchema;

	return (
		<FormProvider {...formSchema}>
			<SEO title="Adicionar despesa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Adicionar despesa</LayoutBox.HeaderTitle>
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

						<PaymentMethodSelectionSection />

						<Row margin="1rem 0 0 0">
							<InputLabel>
								Categoria:
								<TextInput
									placeholder="Insira a categoria de sua despesa aqui..."
									error={errors.category?.message}
									{...register('category')}
								/>
							</InputLabel>
						</Row>
						<Divider />
						<Row margin="0 0 100px 0">
							<Column width="600px">
								<Row gap="0.5rem">
									<InputLabel>
										Valor total:
										<ValueInput
											prefix="R$"
											error={errors.totalValue?.message}
											{...register('totalValue', {
												valueAsNumber: true,
											})}
										/>
									</InputLabel>
									<InputLabel>
										Parcelas:
										<ValueInput
											error={errors.parcelQuantity?.message}
											{...register('parcelQuantity', {
												valueAsNumber: true,
											})}
										/>
									</InputLabel>
									<InputLabel>
										Valor por parcela:
										<ValueInput prefix="R$" disabled value={parcelValue} />
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
								onClick={handleSubmit(createExpenseSubmit)}
								isLoading={isCreatingExpense}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Criar despesa
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</FormProvider>
	);
}
