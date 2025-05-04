import styled from 'styled-components';

import { TextInput } from '@/components/Form';

export const RegisterExpenseForm = styled.form`
	width: 100%;

	display: flex;
	flex-direction: column;
`;

export const ValueInput = styled(TextInput)`
	width: 136px;
`;
