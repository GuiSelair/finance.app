import { ButtonsContainer } from './styles';

import { Button } from '@/components/Button';

export function ActionButtons({ children }: { children: React.ReactNode }) {
	return <ButtonsContainer>{children}</ButtonsContainer>;
}

ActionButtons.Cancel = function ActionButtonsCancel(
	props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
	return (
		<Button type="button" variant="link" {...props}>
			Cancelar
		</Button>
	);
};

ActionButtons.Submit = function ActionButtonsSubmit({
	children,
	...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<Button type="submit" variant="solid" {...rest}>
			{children}
		</Button>
	);
};
