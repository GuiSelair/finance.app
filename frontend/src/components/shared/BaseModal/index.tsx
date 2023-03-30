import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';
import { X } from 'phosphor-react';

import {
	ModalCloseButton,
	ModalContainer,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from './styles';

interface BaseModalProps {
	title: string;
	open: boolean;
	onClose: () => void;
}

export const BaseModal = ({
	open,
	title,
	onClose,
	children,
}: PropsWithChildren<BaseModalProps>) => {
	return (
		<Dialog.Root open={open}>
			<Dialog.Portal>
				<ModalOverlay onClick={onClose} />
				<ModalContainer onEscapeKeyDown={onClose}>
					<ModalHeader>
						<div>
							<Dialog.Title>{title}</Dialog.Title>
						</div>
						<Dialog.Close asChild>
							<ModalCloseButton onClick={onClose}>
								<X weight="bold" />
							</ModalCloseButton>
						</Dialog.Close>
					</ModalHeader>

					<ModalContent>{children}</ModalContent>
				</ModalContainer>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
