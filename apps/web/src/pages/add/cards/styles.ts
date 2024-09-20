import { CreditCard } from "phosphor-react";
import styled from "styled-components";

export const RegisterCardsForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0 2rem 0 2rem;
`;

export const CreditCardIcon = styled(CreditCard)`
	width: 2rem;
	height: 2rem;
	color: ${({ theme }) => theme.colors.green800};
	margin-top: 1rem;
	margin-left: 0.5rem;
`