import { Button, ButtonProps } from '@/components/Button';

import { ButtonsContainer } from './ActionButtons.styles';

export function ActionButtons({ children }: Readonly<{ children: React.ReactNode }>) {
	return <ButtonsContainer>{children}</ButtonsContainer>;
}

ActionButtons.Cancel = function ActionButtonsCancel(props: Omit<ButtonProps, 'variant'>) {
	return (
		<Button type="button" variant="link" {...props}>
			Cancelar
		</Button>
	);
};

ActionButtons.Submit = function ActionButtonsSubmit({ children, ...rest }: Omit<ButtonProps, 'variant' | 'type'>) {
	return (
		<Button type="submit" variant="solid" {...rest}>
			{children}
		</Button>
	);
};
