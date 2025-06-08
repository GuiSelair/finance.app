import React, { LabelHTMLAttributes, PropsWithChildren } from 'react';
import type {
	RadioGroupProps as RadixRadioGroupProps,
	RadioGroupItemProps as RadixRadioGroupItemProps,
} from '@radix-ui/react-radio-group';

import {
	RadioGroupRoot,
	RadioGroupIndicator,
	RadioGroupLabel as StyledRadioGroupLabel,
	RadioGroupItem as StyledRadioGroupItem,
} from './RadioGroup.styles';
import { Flex } from '@/components/Flex';

interface CommonProps {
	className?: string;
}

export function RadioGroup({
	children,
	className,
	id,
	...props
}: PropsWithChildren<CommonProps & RadixRadioGroupProps>) {
	return (
		<RadioGroupRoot className={className} id={id} {...props}>
			{children}
		</RadioGroupRoot>
	);
}

export function RadioGroupItem({
	children,
	className,
	id,
	...props
}: PropsWithChildren<CommonProps & RadixRadioGroupItemProps>) {
	return (
		<Flex alignItems="center" gap="0.5rem">
			<StyledRadioGroupItem className={className} id={id} {...props}>
				<RadioGroupIndicator />
			</StyledRadioGroupItem>
			{React.cloneElement(children as React.ReactElement, { htmlFor: id })}
		</Flex>
	);
}

export function RadioGroupLabel({
	children,
	className,
	...props
}: PropsWithChildren<CommonProps & LabelHTMLAttributes<HTMLLabelElement>>) {
	return (
		<StyledRadioGroupLabel className={className} {...props}>
			{children}
		</StyledRadioGroupLabel>
	);
}
