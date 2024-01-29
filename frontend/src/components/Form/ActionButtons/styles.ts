import styled from "styled-components";

import { Button } from "../../Button";

export const ButtonsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.5rem;
`;


export const CancelButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.white};
	color: ${({ theme }) => theme.colors.green800};
`;

export const SubmitButton = styled(Button)`
	background-color: ${({ theme }) => theme.colors.green800};
	color: ${({ theme }) => theme.colors.white};
	font-weight: 600;
`;