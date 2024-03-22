import React from 'react';

import { Spinner, SpinnerProps } from '../Spinner';

import { ButtonContainer } from './styles';

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
}

interface ButtonProps
	extends ButtonContainerProps,
		React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	isDisabled?: boolean;
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
