import { useMemo } from 'react';
import { Controller, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { ArrowSquareOut as ArrowSquareOutIcon, Trash as TrashIcon } from 'phosphor-react';

import { Flex, Grid, InputLabel, Select, Divider, TextInput, Button, Currency, Text } from '@/components';
import { FormExpenseFieldsType } from '../../constants/formSchema';
import { FieldDescription } from '../PaymentMethodSelection/PaymentMethodSelection.styles';
import { sharePeopleExpenseSchema, type ShareExpenseFormFields } from './constants/formSchema';
import { useFetchSharePeopleApi } from '@/hooks/api/sharePeople/useFetchSharePeople.api';
export function ShareExpenseSection() {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
	} = useForm<ShareExpenseFormFields>({
		resolver: yupResolver(sharePeopleExpenseSchema),
	});
	const { control: externalFormControl, watch } = useFormContext<FormExpenseFieldsType>();
	const { fields, append, remove } = useFieldArray({
		control: externalFormControl,
		name: 'sharePeopleExpense',
	});
	const { data: sharePeople, isLoading: isLoadingSharePeople } = useFetchSharePeopleApi();

	const expenseParcelValue = watch('parcelValue') || 0;
	const isExpenseAmountNonFilled = Number(expenseParcelValue) === 0;
	const totalAvailableToSplit = expenseParcelValue - fields.reduce((acc, field) => acc + field.totalValue, 0);

	const youMustPay = useMemo(() => {
		const totalSplitted = fields.reduce((acc, field) => acc + field.totalValue, 0);
		const youAmount = expenseParcelValue - totalSplitted;
		return youAmount;
	}, [fields, expenseParcelValue]);

	const sharePeopleOptions = useMemo(() => {
		return sharePeople?.map(person => ({ label: person.name, value: String(person.id) }));
	}, [sharePeople]);

	function handleAddSharePerson(data: ShareExpenseFormFields) {
		if (data.totalValue > totalAvailableToSplit) {
			setError('totalValue', { message: 'O valor é maior que o valor disponível para dividir' });
			return;
		}

		append(data);
		reset({
			// @ts-expect-error - Resetting the form to the initial state
			person: null,
			totalValue: 0,
		});
	}

	return (
		<>
			<Divider margin="1rem 0" />
			<Grid gridTemplateColumns="1fr 1fr" gap="1.5rem">
				<Flex flexDirection="column" gap="0.5rem">
					<Flex flexDirection="column" gap="1rem">
						<InputLabel>
							Pessoa a ser cobrada:
							<div>
								<Controller
									name="person"
									control={control}
									render={({ field }) => (
										<Select
											placeholder="Selecione a pessoa a ser cobrada"
											options={sharePeopleOptions || []}
											isLoading={isLoadingSharePeople}
											{...field}
										/>
									)}
								/>
								<FieldDescription>
									Não encontrou a pessoa a ser cobrada?{' '}
									<strong>
										<Link href={'/registrations/share-people'} prefetch={false}>
											Cadastre uma aqui!
											<ArrowSquareOutIcon />
										</Link>
									</strong>
								</FieldDescription>
							</div>
						</InputLabel>
						<InputLabel>
							Valor a ser cobrado:
							<Flex flexDirection="column" gap="4px">
								<TextInput
									prefix="R$"
									type="number"
									step="0.01"
									error={isExpenseAmountNonFilled ? 'Preencha o valor total da despesa' : errors.totalValue?.message}
									disabled={isExpenseAmountNonFilled}
									{...register('totalValue')}
								/>
								<FieldDescription>
									Disponível para dividir: <Currency weight={500} value={totalAvailableToSplit} />
								</FieldDescription>
							</Flex>
						</InputLabel>
					</Flex>
					<Button
						size="sm"
						type="button"
						onClick={handleSubmit(handleAddSharePerson)}
						isDisabled={isExpenseAmountNonFilled}
					>
						Adicionar
					</Button>
				</Flex>
				<Flex flexDirection="column" gap="0.5rem">
					<Text weight="500">Divisões:</Text>
					<Divider />

					<Flex flexDirection="column" gap="0.5rem">
						{fields.length === 0 && (
							<Text size="small" color="gray300">
								Nenhuma pessoa a ser cobrada
							</Text>
						)}
						{fields.map((field, index) => (
							<Flex key={field.person.label} alignItems="center" justifyContent="space-between" width="100%" gap="1rem">
								<Text textAlign="left">{field.person.label}</Text>
								<Flex alignItems="center" gap="1rem">
									<Currency value={field.totalValue} />
									<Button size="sm" type="button" variant="dangerGhost" onClick={() => remove(index)}>
										<TrashIcon />
									</Button>
								</Flex>
							</Flex>
						))}

						<Divider />
						<Flex alignItems="center" width="100%" gap="1rem">
							<Text as="strong" textAlign="left">
								Você vai pagar:
							</Text>
							<Currency value={youMustPay} />
						</Flex>
					</Flex>
				</Flex>
			</Grid>
		</>
	);
}
