import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';

export const ModalContainer = styled(Dialog.Content)`
	width: 50rem;
	background: ${({ theme }) => theme.colors.white};
	border-radius: 0.5rem;
	padding: 2rem 1.5rem;

	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const ModalOverlay = styled(Dialog.Overlay)`
	position: fixed;
	width: 100vw;
	height: 1000vh;
	background: rgba(0, 0, 0, 0.75);
	inset: 0;
`;

export const ModalHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;

	> div {
		display: flex;
		flex-direction: column;
	}

	h2 {
		font-weight: 600;
		font-size: 1.5rem;
		line-height: 2rem;
		color: ${({ theme }) => theme.colors.gray600};
	}
`;

export const ModalCloseButton = styled.button`
	all: unset;
	padding: 0.25rem;
	display: flex;
	align-items: center;
	border-radius: 4px;
	cursor: pointer;

	> svg {
		color: ${({ theme }) => theme.colors.gray600};
		font-weight: bold;
		width: 1.25rem;
		height: 1.25rem;
	}

	&:focus {
		outline: 2px solid ${({ theme }) => theme.colors.green500};
	}
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1.25rem;
`;
