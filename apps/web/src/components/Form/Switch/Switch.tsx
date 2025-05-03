import { forwardRef } from 'react';
import { SwitchProps as RadixSwitchProps } from '@radix-ui/react-switch';

import { SwitchContainer, SwitchThumb } from './Switch.styles';

interface SwitchProps extends Omit<RadixSwitchProps, 'onCheckedChange' | 'onChange' | 'disabled'> {
	onChange: (checked: boolean) => void;
	isDisabled?: boolean;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
	{ onChange, isDisabled, ...props },
	ref,
) {
	return (
		<SwitchContainer ref={ref} {...props} onCheckedChange={onChange} disabled={isDisabled}>
			<SwitchThumb />
		</SwitchContainer>
	);
});
