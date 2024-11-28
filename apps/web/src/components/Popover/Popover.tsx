import { PropsWithChildren } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';

import { PopoverArrow, PopoverContent } from './Popover.styles';

export interface PopoverProps {
	overlay: React.ReactNode;
	withArrow?: boolean;
	open?: boolean;
	defaultOpen?: boolean;
	onClose?: () => void;
	maxWidth?: number;
	maxHeight?: number;
	side?: 'top' | 'right' | 'bottom' | 'left';
	sideOffset?: number;
	align?: 'start' | 'center' | 'end';
	alignOffset?: number;
	zIndex?: number;
}

export function Popover({
	children,
	onClose,
	defaultOpen = false,
	open,
	overlay,
	withArrow = false,
	maxWidth,
	maxHeight,
	side = 'bottom',
	sideOffset = 5,
	align = 'center',
	alignOffset = 5,
	zIndex,
}: PropsWithChildren<PopoverProps>) {
	return (
		<RadixPopover.Root defaultOpen={defaultOpen} open={open}>
			<RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
			<RadixPopover.Portal>
				<PopoverContent
					style={{ zIndex: zIndex || undefined }}
					maxWidth={maxWidth}
					maxHeight={maxHeight}
					sideOffset={sideOffset}
					side={side}
					align={align}
					alignOffset={alignOffset}
					onEscapeKeyDown={onClose}
					onInteractOutside={onClose}
				>
					{overlay}

					{withArrow && <PopoverArrow />}
				</PopoverContent>
			</RadixPopover.Portal>
		</RadixPopover.Root>
	);
}
