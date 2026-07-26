import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';

import { LayoutBox, Flex, SEO } from '@/components';
import { TextInput, InputLabel, ActionButtons, Switch } from '@/components/Form';

import { PaymentMethodSelectionSection } from './components/PaymentMethodSelection';
import { ShareExpenseSection } from './components/ShareExpenseSection';
import { CREATE_EXPENSE_TAB_ORDER } from './constants/tabOrder';
import { useCreateExpense } from './hooks/useCreateExpense';
import { RegisterExpenseForm, ValueInput } from './ExpenseForm.styles';

const CREATE_EXPENSE_FORM_ID = 'create-expense-form';

export default function CreateExpensePage() {
	const { onSubmitCreateExpense, isCreatingExpense, formSchema, submitShortcutLabel } = useCreateExpense();

	const {
		register,
		formState: { errors },
		reset,
		watch,
	} = formSchema;

	const [isSplit, totalValue, parcelQuantity] = watch(['isSplit', 'totalValue', 'parcelQuantity']) || [];
	const isExpenseAmountNonFilled = !totalValue || !parcelQuantity;

	return (
		<FormProvider {...formSchema}>
			<SEO title="Adicionar despesa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Adicionar despesa</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<RegisterExpenseForm
						id={CREATE_EXPENSE_FORM_ID}
						onSubmit={event => {
							event.preventDefault();
							onSubmitCreateExpense();
						}}
					>
						<Flex>
							<InputLabel>
								Nome:
								<TextInput
									placeholder="Insira o nome de sua despesa aqui"
									error={errors.name?.message}
									tabIndex={CREATE_EXPENSE_TAB_ORDER.name}
									{...register('name')}
								/>
							</InputLabel>
						</Flex>

						<PaymentMethodSelectionSection />

						<Flex gap="1rem" alignItems="flex-start" margin="1rem 0 0 0">
							<div>
								<InputLabel>
									Valor total:
									<ValueInput
										prefix="R$"
										error={errors.totalValue?.message}
										disabled={isSplit}
										tabIndex={CREATE_EXPENSE_TAB_ORDER.totalValue}
										{...register('totalValue')}
									/>
								</InputLabel>
							</div>
							<div>
								<InputLabel>
									Parcelas:
									<ValueInput
										error={errors.parcelQuantity?.message}
										disabled={isSplit}
										tabIndex={CREATE_EXPENSE_TAB_ORDER.parcelQuantity}
										{...register('parcelQuantity', {
											valueAsNumber: true,
										})}
									/>
								</InputLabel>
							</div>
							<div>
								<InputLabel>
									Valor por parcela:
									<ValueInput prefix="R$" disabled tabIndex={-1} {...register('parcelValue')} />
								</InputLabel>
							</div>
							<Flex flexDirection="column" gap="0.5rem" whiteSpace="nowrap">
								<InputLabel>Despesa fixa:</InputLabel>
								<Controller
									name="isRecurring"
									render={({ field: { value, ...field } }) => (
										<Switch checked={value} tabIndex={CREATE_EXPENSE_TAB_ORDER.isRecurring} {...field} />
									)}
								/>
							</Flex>
							<Flex flexDirection="column" gap="0.5rem" whiteSpace="nowrap">
								<InputLabel>Compartilhar despesa:</InputLabel>
								<Controller
									name="isSplit"
									render={({ field: { value, ...field } }) => (
										<Switch
											id="isSplit"
											isDisabled={isExpenseAmountNonFilled}
											checked={value}
											tabIndex={CREATE_EXPENSE_TAB_ORDER.isSplit}
											{...field}
										/>
									)}
								/>
							</Flex>
						</Flex>
						{isSplit && <ShareExpenseSection />}
					</RegisterExpenseForm>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel tabIndex={CREATE_EXPENSE_TAB_ORDER.cancel} onClick={() => reset()} />
							<ActionButtons.Submit
								form={CREATE_EXPENSE_FORM_ID}
								isLoading={isCreatingExpense}
								tabIndex={CREATE_EXPENSE_TAB_ORDER.submit}
								aria-keyshortcuts="Control+Enter Meta+Enter"
								title={`Atalho: ${submitShortcutLabel}`}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Criar despesa ({submitShortcutLabel})
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</FormProvider>
	);
}
