import React from 'react';
import { Controller } from 'react-hook-form';

import { LayoutBox, SEO, Flex } from '@/components';
import { ActionButtons, InputLabel, Select, TextInput } from '@/components/Form';

import { useCreateCards } from './hooks/useCreateCards';
import { RegisterCardsForm, CreditCardIcon } from './CreateCardsPage.styles';

export default function CreateCardsPage() {
	const { availableCardsOptions, handleCancel, handleCreateCard, isCreatingCard, formSchema } = useCreateCards();

	const {
		register,
		formState: { errors },
		handleSubmit,
		control,
	} = formSchema;

	return (
		<>
			<SEO title="Adicionar cartão" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Novo cartão</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<RegisterCardsForm>
						<Flex>
							<InputLabel>
								Apelido:
								<TextInput
									placeholder="Insira o apelido do seu cartão aqui..."
									error={errors.name?.message}
									{...register('name')}
								/>
							</InputLabel>
						</Flex>
						<Flex gap="1.5rem">
							<Flex flex={2} alignItems="center" gap="1rem">
								<InputLabel>
									Bandeira:
									<Controller
										name="flag"
										control={control}
										render={({ field }) => (
											<Select
												placeholder="Selecione a bandeira do cartão..."
												options={availableCardsOptions}
												{...field}
											/>
										)}
									/>
								</InputLabel>
								<CreditCardIcon />
							</Flex>
							<Flex flex={1}>
								<InputLabel>
									Dia de melhor compra:
									<TextInput
										placeholder="Dia que seu cartão vira"
										type="number"
										error={errors.turningDay?.message}
										{...register('turningDay', { valueAsNumber: true })}
									/>
								</InputLabel>
							</Flex>
							<Flex flex={1}>
								<InputLabel>
									Dia de vencimento:
									<TextInput
										placeholder="Dia que você paga seu cartão"
										type="number"
										error={errors.dueDay?.message}
										{...register('dueDay', { valueAsNumber: true })}
									/>
								</InputLabel>
							</Flex>
						</Flex>
					</RegisterCardsForm>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={handleCancel} />
							<ActionButtons.Submit
								isLoading={isCreatingCard}
								onClick={handleSubmit(handleCreateCard)}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Criar cartão
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</>
	);
}
