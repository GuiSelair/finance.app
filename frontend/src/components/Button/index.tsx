import React from 'react';
import { ButtonContainer, ButtonContainerProps } from './styles';
import { Spinner } from '../Spinner';

interface ButtonProps
	extends ButtonContainerProps,
		React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	isDisabled?: boolean;
}

export function Button({
	children,
	isLoading,
	isDisabled,
	...rest
}: React.PropsWithChildren<ButtonProps>) {
	return (
		<ButtonContainer disabled={isDisabled || isLoading} {...rest}>
			{isLoading ? <Spinner size="sm" /> : children}
		</ButtonContainer>
	);
}
