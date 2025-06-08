import styled from 'styled-components';
import * as RadixCheckbox from '@radix-ui/react-checkbox';

import { InputLabel } from '../InputLabel';

export const CheckboxRoot = styled(RadixCheckbox.Root)`
	all: unset;
	background-color: ${props => props.theme.colors.green100};
	width: 20px;
	height: 20px;
	border-radius: 0.25rem;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	border: 1px solid ${props => props.theme.colors.green100};
	transition: border-color 0.2s ease-in-out;

	&:hover {
		border-color: ${props => props.theme.colors.green500};
	}

	&:focus {
		border-color: ${props => props.theme.colors.green500};
	}
`;

export const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
	margin-top: 0.125rem;
	color: ${props => props.theme.colors.green800};
`;

export const CheckboxLabel = styled(InputLabel)`
	margin-bottom: unset;
`;
