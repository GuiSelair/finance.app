import { styled } from 'styled-components';

import { Button } from '@/components/Button';
import { Flex } from '@/components';

export const FilterContainer = styled.section`
	display: flex;
	align-items: center;
	background: ${props => props.theme.colors.green100};
	padding: 0.875rem 1rem;
	border-radius: 8px;
	margin-top: 0.5rem;
	gap: 0.5rem;
`;

export const FilterButton = styled(Button)`
	border: 1px solid ${props => props.theme.colors.gray100};
	background: ${props => props.theme.colors.white};
	color: ${props => props.theme.colors.green500};

	&:not(:disabled):hover {
		background-color: ${({ theme }) => theme.colors.white};
		border-color: ${({ theme }) => theme.colors.green500};
	}
`;

export const FilterMenuContainer = styled(Flex)`
	width: 400px;
	flex-direction: column;
	gap: 0.5rem;
`;

export const FilterMenuHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const FilterMenuContent = styled(Flex)`
	flex-direction: column;
	gap: 0.5rem;
	margin-top: 0.5rem;
`;

export const FilterMenuCountContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${props => props.theme.colors.green500};
	width: 20px;
	height: 20px;
	border-radius: 100%;
`;

export const FilterMenuClearButton = styled(Button)`
	color: ${props => props.theme.colors.red500};

	&:not(:disabled):hover {
		background-color: ${props => props.theme.colors.red100};
	}
`;
