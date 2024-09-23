import styled from 'styled-components';

import { TextInput } from '@/components/Form';

export const RegisterExpenseForm = styled.form`
	width: 100%;

	display: flex;
	flex-direction: column;
`;

export const Divider = styled.hr`
	display: block;
	border: 0;
	border-top: 1px solid ${props => props.theme.colors.gray100};
	margin: 1rem 0;
	padding: 0;
`;

export const ValueInput = styled(TextInput)`
	width: 136px;
`;
