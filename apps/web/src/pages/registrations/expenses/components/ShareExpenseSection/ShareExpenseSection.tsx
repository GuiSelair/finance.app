import { useEffect, useMemo } from 'react';
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
		formState: { errors, isValid },
		reset,
		setError,
	} = useForm<ShareExpenseFormFields>({
		resolver: yupResolver(sharePeopleExpenseSchema),
	});
	const {
		control: externalFormControl,
		watch,
		unregister,
		formState: { errors: externalErrors },
	} = useFormContext<FormExpenseFieldsType>();
	const { fields, append, remove } = useFieldArray({
		control: externalFormControl,
		name: 'sharePeopleExpense',
	});
	const { data: sharePeople, isLoading: isLoadingSharePeople } = useFetchSharePeopleApi();

	const expenseParcelValue = watch('parcelValue') || 0;
	const hasSharePeopleError = !!externalErrors.sharePeopleExpense;

	const totalAvailableToSplit = useMemo(() => {
		return expenseParcelValue - fields.reduce((acc, field) => acc + field.amount, 0);
	}, [expenseParcelValue, fields]);

	const youMustPay = useMemo(() => {
		const totalSplitted = fields.reduce((acc, field) => acc + field.amount, 0);
		const youAmount = expenseParcelValue - totalSplitted;
		return youAmount;
	}, [fields, expenseParcelValue]);

	const sharePeopleOptions = useMemo(() => {
		return sharePeople?.map(person => ({ label: person.name, value: String(person.id) }));
	}, [sharePeople]);

	function handleAddSharePerson(data: ShareExpenseFormFields) {
		if (data.amount > totalAvailableToSplit) {
			setError('amount', { message: 'O valor é maior que o valor disponível para dividir' });
			return;
		}

		append(data);
		reset({
			// @ts-expect-error - Resetting the form to the initial state
			person: null,
			amount: 0,
		});
	}

	/**
	 * Effect responsável por limpar o estado do form quando o componente for desmontado, isso é feito
	 * quando o usuário desmarca a opção de dividir a despesa.
	 */
	useEffect(() => {
		return () => {
			unregister('sharePeopleExpense');
			remove();
		};
	}, []);

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
									error={errors.amount?.message}
									{...register('amount')}
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
						variant="outline"
						onClick={handleSubmit(handleAddSharePerson)}
						isDisabled={!isValid}
					>
						Adicionar
					</Button>
				</Flex>
				<Flex flexDirection="column" gap="0.5rem">
					<Text weight="500">Divisões:</Text>
					<Divider />

					<Flex flexDirection="column" gap="0.5rem">
						{!hasSharePeopleError && fields.length === 0 && (
							<Text size="small" color="gray300">
								Nenhuma pessoa a ser cobrada
							</Text>
						)}
						{hasSharePeopleError && (
							<Text size="small" color="red500">
								{externalErrors.sharePeopleExpense?.message}
							</Text>
						)}
						{fields.map((field, index) => (
							<Flex key={field.person.label} alignItems="center" justifyContent="space-between" width="100%" gap="1rem">
								<Text textAlign="left">{field.person.label}</Text>
								<Flex alignItems="center" gap="1rem">
									<Currency value={field.amount} />
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
