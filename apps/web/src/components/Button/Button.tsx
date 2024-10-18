import React from 'react';

import { Spinner, SpinnerProps } from '../Spinner';

import { ButtonContainer } from './Button.styles';

export interface ButtonContainerProps {
	/**
	 * Variação de estilos do botão
	 * @default solid
	 */
	variant?: 'solid' | 'outline' | 'ghost' | 'link';
	/**
	 * Variação de tamanho do botão
	 * @default md
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg';
	/**
	 * Permite que o botão preencha todo o espaço disponível.
	 * @default false
	 */
	fullWidth?: boolean;
}

export interface ButtonProps extends ButtonContainerProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * Indica se o botão esta em estado de carregamento. Quando esta ativo, desabilita o botão
	 * e exibe um spinner no centro.
	 * @default false
	 */
	isLoading?: boolean;
	/**
	 * Indica se o botão esta desabilitado.
	 * @default false
	 */
	isDisabled?: boolean;
	/**
	 * Define configurações adicionais para o spinner que aparece quando o botão esta em
	 * estado de carregamento.
	 * @default undefined
	 */
	spinnerConfig?: SpinnerProps;
}

export function Button({
	children,
	isLoading,
	isDisabled,
	spinnerConfig = { mode: 'dark', size: 'sm' },
	...rest
}: React.PropsWithChildren<ButtonProps>) {
	return (
		<ButtonContainer disabled={isDisabled || isLoading} {...rest}>
			{isLoading ? <Spinner {...spinnerConfig} /> : children}
		</ButtonContainer>
	);
}
