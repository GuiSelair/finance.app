import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LayoutBox } from '@/components/LayoutBox';
import { ActionButtons, Column, InputLabel, Row, Select, TextInput } from '@/components/Form';
import { SEO } from '@/components/SEO';

import { useCreateCards } from './hooks/useCreateCards';
import { createCardFormSchema, ICreateCardFields } from './constants/formSchema';
import { RegisterCardsForm, CreditCardIcon } from './styles';

export default function CreateCardsPage() {
	const { register, handleSubmit, control, formState: { isValid, errors } } = useForm<ICreateCardFields>({
		defaultValues: {
			creditLimit: 0
		},
		resolver: yupResolver(createCardFormSchema),
	})
	const { availableCardsOptions, handleCancel, handleCreateCard, isCreatingCard } = useCreateCards();

	return (
		<>
			<SEO title="Adicionar cartão"/>
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Novo cartão</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<RegisterCardsForm onSubmit={handleSubmit(handleCreateCard)}>
						<Row>
							<InputLabel>
								Apelido:
								<TextInput 
									placeholder='Insira o apelido do seu cartão aqui...'
									error={errors.name?.message}
									{...register('name')}
								/>
							</InputLabel>
						</Row>
						<Row flex={4} gap='1.5rem' padding='0 65px 0 0'>
							<Column flex={2}>
								<Row>
									<InputLabel>
										Bandeira:
										<Controller
											name="flag"
											control={control}
											render={({ field }) => (
												<Select
													placeholder='Selecione a bandeira do cartão...'
													options={availableCardsOptions}
													{...field}
												/>
											)}
										/>
									</InputLabel>
									<CreditCardIcon />
								</Row>
							</Column>
							<Column flex={1}>
								<InputLabel>
									Dia de melhor compra:
									<TextInput 
										placeholder='Dia que seu cartão vira' 
										type="number"
										error={errors.dueDay?.message}
										{...register('dueDay', { valueAsNumber: true })}
									/>
								</InputLabel>
							</Column>
							<Column flex={1}>
								<InputLabel>
									Dia de vencimento:
									<TextInput 
										placeholder='Dia que você paga seu cartão' 
										type="number"
										error={errors.turningDay?.message}
										{...register('turningDay', { valueAsNumber: true })}
									/>
								</InputLabel>
							</Column>
						</Row>
						<Row>
							<Column>
								<InputLabel>
									Limite do cartão:
									<TextInput 
										prefix='R$' 
										type="number" 
										placeholder='1000'
										error={errors.creditLimit?.message}
										{...register('creditLimit', { valueAsNumber: true })}
									/>
								</InputLabel>
							</Column>
						</Row>
					</RegisterCardsForm>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={handleCancel}/>
							<ActionButtons.Submit disabled={!isValid || isCreatingCard}>Criar cartão</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</>
	);
}
