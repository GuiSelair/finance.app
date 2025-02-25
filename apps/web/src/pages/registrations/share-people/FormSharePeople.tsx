import { Controller, UseFormReturn } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import { InputLabel, TextInput, Grid, Select } from '@/components';
import { InputMasks } from '@/constants/inputMasks';
import { betterDaysToSendInvoiceOptions } from './constants/betterDaysToSendInvoiceOptions';
import { SharePeopleFormType } from './constants/formSchema';

interface FormSharePeopleProps {
	formMethods: UseFormReturn<SharePeopleFormType>;
	mode: 'create' | 'edit';
}

export function FormSharePeople({ formMethods }: FormSharePeopleProps) {
	const {
		register,
		formState: { errors },
		control,
	} = formMethods;
	const registerWithMask = useHookFormMask(register);

	return (
		<>
			<InputLabel>
				Nome:
				<TextInput placeholder="Insira o nome da pessoa aqui" error={errors.name?.message} {...register('name')} />
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
								<Select placeholder="Selecione o melhor dia" options={betterDaysToSendInvoiceOptions} {...field} />
							);
						}}
					/>
				</InputLabel>
			</Grid>
		</>
	);
}
