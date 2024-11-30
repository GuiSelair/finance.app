import { WarningCircle, CheckCircle } from 'phosphor-react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import { Button, Popover, Spinner, TextInput } from '@/components';
import { defaultTheme } from '@/styles/theme/default';

import { OverlayContainer, OverlayTitle } from './FormIncomePopover.styles';
import { FormIncomeSchema, formIncomeSchema } from './constants/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModifyMonthIncomeApi } from '@/hooks/api/settings/useModifyMonthIncome.api';
import { useFindMonthIncomeApi } from '@/hooks/api/settings/useFindMonthIncome.api';

export function FormIncomePopover() {
	const { refetch, data } = useFindMonthIncomeApi({ ignoreInitialFetch: true });
	const formMethods = useForm<FormIncomeSchema>({
		resolver: yupResolver(formIncomeSchema),
		defaultValues: async () => {
			const { data } = await refetch();
			return {
				income: data?.income?.income || 0,
			};
		},
	});

	const hasCurrentMonthIncome = data?.income || null;
	const isLoading = !data;

	return (
		<FormProvider {...formMethods}>
			<Popover overlay={<FormIncome />} withArrow sideOffset={8} maxWidth={400}>
				{isLoading ? (
					<Spinner size="sm" />
				) : (
					<Button variant="link" size="icon">
						{hasCurrentMonthIncome ? (
							<CheckCircle color={defaultTheme.colors.green400} size={16} />
						) : (
							<WarningCircle color={defaultTheme.colors.orange500} size={16} />
						)}
					</Button>
				)}
			</Popover>
		</FormProvider>
	);
}

function FormIncome() {
	const {
		register,
		formState: { isDirty, errors, isValid },
		handleSubmit,
		reset,
		watch,
	} = useFormContext<FormIncomeSchema>();
	const { mutateAsync, isLoading } = useModifyMonthIncomeApi();

	const hasCurrentMonthIncome = watch('income') || null;

	async function handleModifyIncome({ income }: FormIncomeSchema) {
		await mutateAsync({ income });
		reset(
			{ income },
			{
				keepDirty: false,
			},
		);
	}
	return (
		<form onSubmit={handleSubmit(handleModifyIncome)}>
			<OverlayContainer>
				<OverlayTitle>
					{hasCurrentMonthIncome
						? 'Visualize e edite se quiser o valor de entrada para o mês atual'
						: 'Adicione um valor de entrada para calcular o valor da sua economia.'}
				</OverlayTitle>

				<TextInput
					type="number"
					size="sm"
					placeholder="00.00"
					prefix="R$"
					error={errors.income?.message}
					disabled={isLoading}
					{...register('income')}
				/>
				<Button variant="solid" size="full" isDisabled={!isDirty || !isValid} type="submit" isLoading={isLoading}>
					{hasCurrentMonthIncome ? 'Salvar' : 'Adicionar entrada'}
				</Button>
			</OverlayContainer>
		</form>
	);
}
