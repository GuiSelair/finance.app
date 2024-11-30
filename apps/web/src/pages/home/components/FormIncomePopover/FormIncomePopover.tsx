import { WarningCircle, CheckCircle } from 'phosphor-react';
import { useForm } from 'react-hook-form';

import { Button, Popover, TextInput } from '@/components';
import { defaultTheme } from '@/styles/theme/default';

import { OverlayContainer, OverlayTitle } from './FormIncomePopover.styles';
import { FormIncome, formIncomeSchema } from './constants/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModifyMonthIncomeApi } from '@/hooks/api/settings/useModifyMonthIncome.api';
import { useFindMonthIncomeApi } from '@/hooks/api/settings/useFindMonthIncome.api';

export function FormIncomePopover() {
	const { data, isLoading: isFindingIncome, refetch } = useFindMonthIncomeApi({ ignoreInitialFetch: true });
	const {
		register,
		formState: { isDirty, errors },
		handleSubmit,
		reset,
	} = useForm<FormIncome>({
		resolver: yupResolver(formIncomeSchema),
		defaultValues: async () => {
			const { data } = await refetch();
			return {
				income: data?.income?.income || 0,
			};
		},
	});
	const { mutateAsync, isLoading: isModifyingIncome } = useModifyMonthIncomeApi();

	const hasCurrentMonthIncome = data?.income;

	async function handleModifyIncome({ income }: FormIncome) {
		await mutateAsync({ income });
		reset(
			{ income },
			{
				keepDirty: false,
			},
		);
		// TODO: Corrigir input perdendo foco depois que primeiro digito é inserido
	}

	const FormIncomeOverlay = () => {
		return (
			<form onSubmit={handleSubmit(handleModifyIncome)}>
				<OverlayContainer>
					<OverlayTitle>
						{hasCurrentMonthIncome
							? 'Visualize e edite se quiser o valor de entrada para o mês atual'
							: 'Adicione um valor de entrada para calcular o valor da sua economia.'}
					</OverlayTitle>

					<TextInput
						size="sm"
						placeholder="00.00"
						prefix="R$"
						error={errors.income?.message}
						disabled={isFindingIncome}
						{...register('income')}
					/>
					<Button
						variant="solid"
						size="full"
						isDisabled={!isDirty}
						type="submit"
						isLoading={isModifyingIncome || isFindingIncome}
					>
						{hasCurrentMonthIncome ? 'Salvar' : 'Adicionar entrada'}
					</Button>
				</OverlayContainer>
			</form>
		);
	};

	return (
		<Popover overlay={<FormIncomeOverlay />} withArrow sideOffset={8} maxWidth={400}>
			<Button variant="link" size="icon">
				{hasCurrentMonthIncome ? (
					<CheckCircle color={defaultTheme.colors.green400} size={16} />
				) : (
					<WarningCircle color={defaultTheme.colors.orange500} size={16} />
				)}
			</Button>
		</Popover>
	);
}
