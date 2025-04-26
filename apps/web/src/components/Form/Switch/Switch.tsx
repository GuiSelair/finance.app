import { forwardRef } from 'react';
import { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch';

import { SwitchContainer, SwitchThumb } from './Switch.styles';

interface SwitchProps extends Omit<RadixSwitchProps, 'onCheckedChange' | 'onChange'> {
	onChange: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch({ onChange, ...props }, ref) {
	return (
		<SwitchContainer onCheckedChange={onChange} ref={ref} {...props}>
			<SwitchThumb />
		</SwitchContainer>
	);
});
