import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';

import { LayoutBox, Flex, SEO } from '@/components';
import { TextInput, InputLabel, ActionButtons, Switch } from '@/components/Form';

import { PaymentMethodSelectionSection } from './components/PaymentMethodSelection';
import { ShareExpenseSection } from './components/ShareExpenseSection';
import { useCreateExpense } from './hooks/useCreateExpense';
import { RegisterExpenseForm, ValueInput } from './ExpenseForm.styles';

export default function CreateExpensePage() {
	const { createExpenseSubmit, isCreatingExpense, formSchema } = useCreateExpense();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = formSchema;

	const isSplit = watch('isSplit') || false;

	return (
		<FormProvider {...formSchema}>
			<SEO title="Adicionar despesa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Adicionar despesa</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<RegisterExpenseForm>
						<Flex>
							<InputLabel>
								Nome:
								<TextInput
									placeholder="Insira o nome de sua despesa aqui"
									error={errors.name?.message}
									{...register('name')}
								/>
							</InputLabel>
						</Flex>

						<PaymentMethodSelectionSection />

						<Flex gap="1rem" alignItems="flex-start" margin="1rem 0 0 0">
							<div>
								<InputLabel>
									Valor total:
									<ValueInput prefix="R$" error={errors.totalValue?.message} {...register('totalValue')} />
								</InputLabel>
							</div>
							<div>
								<InputLabel>
									Parcelas:
									<ValueInput
										error={errors.parcelQuantity?.message}
										{...register('parcelQuantity', {
											valueAsNumber: true,
										})}
									/>
								</InputLabel>
							</div>
							<div>
								<InputLabel>
									Valor por parcela:
									<ValueInput prefix="R$" disabled {...register('parcelValue')} />
								</InputLabel>
							</div>
							<Flex flexDirection="column" gap="0.5rem" whiteSpace="nowrap">
								<InputLabel>Despesa fixa:</InputLabel>
								<Controller
									name="isRecurring"
									render={({ field: { value, ...field } }) => <Switch checked={value} {...field} />}
								/>
							</Flex>
							<Flex flexDirection="column" gap="0.5rem" whiteSpace="nowrap">
								<InputLabel>Compartilhar despesa:</InputLabel>
								<Controller
									name="isSplit"
									render={({ field: { value, ...field } }) => <Switch checked={value} {...field} />}
								/>
							</Flex>
						</Flex>
						{isSplit && <ShareExpenseSection />}
					</RegisterExpenseForm>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={() => reset()} />
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
