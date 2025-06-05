import styled from 'styled-components';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';

import { InputLabel } from '../InputLabel';

export const RadioGroupRoot = styled(RadixRadioGroup.Root)`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const RadioGroupIndicator = styled(RadixRadioGroup.Indicator)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: relative;

	&::after {
		content: '';
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: ${props => props.theme.colors.green800};
	}
`;

export const RadioGroupLabel = styled(InputLabel)`
	margin-bottom: unset;
`;

export const RadioGroupItem = styled(RadixRadioGroup.Item)`
	all: unset;
	background-color: ${props => props.theme.colors.green100};
	width: 20px;
	height: 20px;
	padding-left: 1px;
	border-radius: 100%;
	cursor: pointer;
	border: 1px solid ${props => props.theme.colors.green100};
	transition: border-color 0.2s ease-in-out;

	&:hover {
		border-color: ${props => props.theme.colors.green500};
	}

	&:focus {
		border-color: ${props => props.theme.colors.green500};
	}

	&[data-state='checked'] {
		border-color: ${props => props.theme.colors.green500};
	}
`;
