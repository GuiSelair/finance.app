import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { TextInput, InputLabel, ActionButtons } from '@/components/shared/Form';
import { SEO } from '@/components/shared/SEO';
import { PaymentMethodSelectionSection } from '@/components/pages/add/expenses/PaymentMethodSelection';
import { ICreateExpenseFields, useCreateExpenses } from '@/hooks/pages/useCreateExpenses';
import {
	RegisterExpenseTitle,
	RegisterExpenseForm,
	Row,
	Column,
	Divider,
	ValueInput,
	FooterForm,
} from '@/styles/pages/add/expense.style';

const createExpenseFormSchema = yup.object().shape({
	name: yup.string().required('Campo obrigatório'),
	category: yup.string(),
	totalValue: yup.string().required('Campo obrigatório'),
	parcelQuantity: yup.number().required('Campo obrigatório'),
	paymentMethod: yup.object().required('Campo obrigatório'),
}); 

export default function CreateExpenses() {
	const formConfig = useForm<ICreateExpenseFields>({
		resolver: yupResolver(createExpenseFormSchema),
		defaultValues: {
			parcelQuantity: 1,
		}
	});

	const { watch, handleSubmit, formState: { errors } } = formConfig
	const { calculateParcelValue, createExpenseSubmit, goBack } = useCreateExpenses();
	
	const parcelValue = calculateParcelValue(watch('totalValue'), watch('parcelQuantity')) ?? 0;

	return (
		<FormProvider {...formConfig}>
			<SEO title="Adicionar despesa"/>
			<LayoutBox>
				<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

				<RegisterExpenseForm onSubmit={handleSubmit(createExpenseSubmit)}>
					<Row>
						<InputLabel>
							Nome:
							<TextInput
								placeholder="Insira o nome de sua despesa aqui" 
								error={errors.name?.message} 
								{...formConfig.register('name')}
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
								{...formConfig.register('category')}
							/>
						</InputLabel>
					</Row>
					<Divider />
					<Row margin="0 0 100px 0">
						<Column width="480px" >
							<Row>
								<InputLabel>
									Valor total:
									<ValueInput 
										prefix="R$" 
										error={errors.totalValue?.message}
										{...formConfig.register('totalValue')} 
									/>
								</InputLabel>
								<InputLabel>
									Parcelas:
									<ValueInput 
										error={errors.parcelQuantity?.message}
										{...formConfig.register('parcelQuantity', { valueAsNumber: true })} 
									/>
								</InputLabel>
								<InputLabel>
									Valor por parcela:
									<ValueInput prefix="R$" disabled value={parcelValue} />
								</InputLabel>
							</Row>
						</Column>
					</Row>
					<FooterForm>
						<ActionButtons
							handleCancel={goBack}
							submitButtonText='Criar despesa'
						/>
					</FooterForm>
				</RegisterExpenseForm>
			</LayoutBox>
		</FormProvider>
	);
}
