import { useState } from 'react';
import { WarningCircle, CheckCircle } from 'phosphor-react';
import { useForm } from 'react-hook-form';

import { Button, Popover, TextInput } from '@/components';
import { defaultTheme } from '@/styles/theme/default';

import { OverlayContainer, OverlayTitle } from './FormIncomePopover.styles';
import { FormIncome, formIncomeSchema } from './constants/formSchema';
import { yupResolver } from '@hookform/resolvers/yup';

export function FormIncomePopover() {
	const {
		register,
		formState: { isDirty, errors },
		handleSubmit,
	} = useForm<FormIncome>({
		resolver: yupResolver(formIncomeSchema),
	});
	const [hasCurrentMonthIncome, setHasCurrentMonthIncome] = useState(false);

	function handleModifyIncome({ income }: FormIncome) {
		// TODO: Implementar logica de requisição
		// TODO: Corrigir input perdendo foco depois que primeiro digito é inserido
		console.log(income);
		setHasCurrentMonthIncome(true);
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

					<TextInput size="sm" placeholder="00.00" prefix="R$" {...register('income')} error={errors.income?.message} />
					<Button variant="solid" size="full" isDisabled={!isDirty} type="submit">
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
