import * as RadixSwitch from '@radix-ui/react-switch';
import styled from 'styled-components';

export const SwitchContainer = styled(RadixSwitch.Root)`
	all: unset;
	width: 50px;
	height: 30px;
	background-color: ${({ theme }) => theme.colors.gray200};
	border-radius: 14px;
	position: relative;

	&[data-state='checked'] {
		background-color: ${({ theme }) => theme.colors.green800};
	}

	&:focus {
		outline: 3px solid ${({ theme }) => theme.colors.green800};
		outline-offset: 1px;
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
`;

export const SwitchThumb = styled(RadixSwitch.Thumb)`
	display: block;
	width: 26px;
	height: 26px;
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 100%;
	transition: transform 100ms;
	transform: translateX(2px);
	will-change: transform;

	&[data-state='checked'] {
		transform: translateX(21px);
	}
`;
