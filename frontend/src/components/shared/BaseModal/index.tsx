import * as Dialog from '@radix-ui/react-dialog';

interface BaseModalProps {
	title: string;
	description: string;
	open: boolean;
	onClose: () => void;
}

export const BaseModal = ({
	description,
	open,
	title,
	onClose,
}: BaseModalProps) => {
	return (
		<Dialog.Root open={open}>
			<Dialog.Portal>
				<Dialog.Overlay />
				<Dialog.Content>
					<Dialog.Title>{title}</Dialog.Title>
					<Dialog.Description>{description}</Dialog.Description>
					<Dialog.Close onClick={onClose}>Close</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
