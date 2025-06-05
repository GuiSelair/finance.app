import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';
import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox';
import { Check as CheckIcon } from 'phosphor-react';

import { CheckboxRoot, CheckboxIndicator, CheckboxLabel as StyledCheckboxLabel } from './Checkbox.styles';
import { Flex } from '@/components/Flex';

interface CommonProps {
	className?: string;
}

export function Checkbox({ children, className, id, ...props }: PropsWithChildren<CommonProps & RadixCheckboxProps>) {
	return (
		<Flex alignItems="center" gap="0.5rem">
			<CheckboxRoot className={className} id={id} {...props}>
				<CheckboxIndicator>
					<CheckIcon size={16} />
				</CheckboxIndicator>
			</CheckboxRoot>
			{React.cloneElement(children as React.ReactElement, { htmlFor: id })}
		</Flex>
	);
}

export function CheckboxLabel({
	children,
	className,
	...props
}: PropsWithChildren<CommonProps & LabelHTMLAttributes<HTMLLabelElement>>) {
	return (
		<StyledCheckboxLabel className={className} {...props}>
			{children}
		</StyledCheckboxLabel>
	);
}
