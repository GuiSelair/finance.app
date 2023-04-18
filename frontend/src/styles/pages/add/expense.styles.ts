import styled from 'styled-components';

export const RegisterExpenseTitle = styled.h2`
	font-weight: 600;
	font-size: 2rem;
	line-height: 100%;
	letter-spacing: -0.05em;
	color: ${({ theme }) => theme.colors.green800};
`;

export const RegisterExpenseForm = styled.form`
	width: 100%;
	margin-top: 2.5rem;

	display: flex;
	flex-direction: column;

	& .inline {
		display: flex;
		align-items: center;
	}
`;
