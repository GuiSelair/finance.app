import { Button } from '@/components';
import styled from 'styled-components';

export const OptionButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin: 0 2px;

	svg {
		width: 1rem;
		height: 1rem;
	}
`;

export const DeleteOptionButton = styled(Button)`
	background: ${({ theme }) => theme.colors.red100};

	svg {
		color: ${props => props.theme.colors.red500};
	}
`;
