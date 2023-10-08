import React from 'react';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { TextInput, InputLabel } from '@/components/shared/Form';
import { SEO } from '@/components/shared/SEO';
import { PaymentMethodSelectionSection } from '@/components/pages/add/expenses/PaymentMethodSelection';

import {
	RegisterExpenseTitle,
	RegisterExpenseForm,
	Row,
	Column,
	Divider,
	ValueInput,
} from '@/styles/pages/add/expense.style';
import { FormProvider, useForm } from 'react-hook-form';
import { Card } from '@/models/card';
import { ICreateExpenseFields, useCreateExpenses } from '@/hooks/pages/useCreateExpenses';

export default function CreateExpenses() {
	const formConfig = useForm<ICreateExpenseFields>({
		defaultValues: {
			parcelQuantity: 1,
		}
	});

	const { watch, handleSubmit } = formConfig
	const { calculateParcelValue, createExpenseSubmit } = useCreateExpenses();
	
	const parcelValue = calculateParcelValue(watch('totalValue'), watch('parcelQuantity')) ?? 0;

	const handleCreateExpenseSubmit = handleSubmit(async (data: ICreateExpenseFields) => await createExpenseSubmit(data));

	return (
		<FormProvider {...formConfig}>
			<SEO title="Adicionar despesa"/>
			<LayoutBox>
				<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

				<RegisterExpenseForm onSubmit={handleCreateExpenseSubmit}>
					<Row>
						<InputLabel>
							Nome:
							<TextInput placeholder="Insira o nome de sua despesa aqui" {...formConfig.register('name')} />
						</InputLabel>
					</Row>
					
					<PaymentMethodSelectionSection />

					<Row margin="1rem 0 0 0">
						<InputLabel>
							Categoria:
							<TextInput placeholder="Insira a categoria de sua despesa aqui..." {...formConfig.register('category')}  />
						</InputLabel>
					</Row>
					<Divider />
					<Row margin="0 0 100px 0">
						<Column width="480px">
							<Row>
								<InputLabel>
									Valor total:
									<ValueInput prefix="R$" {...formConfig.register('totalValue', { valueAsNumber: true })}  />
								</InputLabel>
								<InputLabel>
									Parcelas:
									<ValueInput {...formConfig.register('parcelQuantity', { valueAsNumber: true })} />
								</InputLabel>
								<InputLabel>
									Valor por parcela:
									<ValueInput prefix="R$" disabled value={parcelValue} />
								</InputLabel>
							</Row>
						</Column>
					</Row>
					<Row>
						<Column></Column>
						<Column>
							<button type='submit'>Criar despesa</button>
						</Column>
					</Row>
				</RegisterExpenseForm>
			</LayoutBox>
		</FormProvider>
	);
}
