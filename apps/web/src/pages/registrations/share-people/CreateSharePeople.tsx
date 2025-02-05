import { Controller } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { ActionButtons, Flex, Grid, InputLabel, LayoutBox, Select, SEO, TextInput } from '@/components';
import { betterDaysToSendInvoiceOptions } from './constants/betterDaysToSendInvoiceOptions';
import { useCreateSharePeople } from './hooks/useCreateSharePeople';
import { InputMasks } from '@/constants/inputMasks';

export default function SharePeoplePage() {
	const { formMethods, handleCreateSharePeople } = useCreateSharePeople();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
	} = formMethods;
	const registerWithMask = useHookFormMask(register);

	return (
		<>
			<SEO title="Adicionar nova pessoa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Nova pessoa para compartilhar</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<Flex
						as={'form'}
						id="share-people-form-id"
						flexDirection="column"
						gap="1rem"
						onSubmit={handleSubmit(data => handleCreateSharePeople(data))}
					>
						<InputLabel>
							Nome:
							<TextInput
								placeholder="Insira o nome da pessoa aqui"
								error={errors.name?.message}
								{...register('name')}
							/>
						</InputLabel>
						<Grid gap="1.5rem" gridTemplateColumns="minmax(300px, 1fr) minmax(300px, 1fr)">
							<InputLabel>
								Whatsapp:
								<TextInput
									placeholder="Whatsapp"
									type="tel"
									error={errors.whatsapp?.message}
									{...registerWithMask('whatsapp', [InputMasks.Phone])}
								/>
							</InputLabel>
							<InputLabel>
								Melhor dia para enviar fatura:
								<Controller
									name="betterDayToSendInvoice"
									control={control}
									render={({ field }) => {
										return (
											<Select
												placeholder="Selecione o melhor dia"
												options={betterDaysToSendInvoiceOptions}
												{...field}
											/>
										);
									}}
								/>
							</InputLabel>
						</Grid>
					</Flex>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={() => {}} />
							<ActionButtons.Submit
								form="share-people-form-id"
								isLoading={isSubmitting}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Criar pessoa
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</>
	);
}
