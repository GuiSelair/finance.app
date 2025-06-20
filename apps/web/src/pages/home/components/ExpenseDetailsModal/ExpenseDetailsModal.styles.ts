import { CheckCircle, Trash } from 'phosphor-react';
import styled from 'styled-components';

import { Text } from '@/components';

interface IExpensePaidIconProps {
	isPaid: boolean;
}

export const ExpenseBaseDetails = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 200px 1fr 120px 107px;
	align-items: baseline;
	margin-bottom: 1.5rem;
	gap: 1rem;

	> div {
		span {
			font-size: 1rem;
			font-weight: 300;
			color: ${props => props.theme.colors.gray400};
			margin-bottom: 0.5rem;
			display: block;
		}

		p {
			margin-bottom: unset;
			font-size: 1rem;
			font-weight: 400;
			color: ${props => props.theme.colors.gray400};
		}

		svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
`;

export const ExpenseAmountDetails = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	margin-bottom: 1rem;
`;

export const ExpenseAmountDetailsItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background: ${props => props.theme.colors.green100};
	border: 1px solid ${props => props.theme.colors.green800};
	border-radius: 8px;
	padding: 0.75rem;

	> span {
		display: block;
		color: ${props => props.theme.colors.gray500};
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 0.5rem;
	}

	> p {
		margin-bottom: unset;
		color: ${props => props.theme.colors.gray500};
		font-size: 1.5rem;
	}

	> strong {
		color: ${props => props.theme.colors.green800};
		font-size: 1.5rem;
		font-weight: 600;
	}
`;

export const ExpenseDescriptionAndCardDetails = styled.div`
	display: grid;
	grid-template-columns: 1fr 134px;
	gap: 1rem;
	margin-bottom: 1rem;
`;

export const ExpenseDescription = styled.div`
	span {
		display: block;
		color: ${props => props.theme.colors.gray500};
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: unset;
		font-size: 1.125rem;
		font-weight: 400;
		color: ${props => props.theme.colors.gray400};
	}
`;

export const ExpenseCard = styled.div`
	span {
		display: block;
		color: ${props => props.theme.colors.gray500};
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 0.5rem;
	}

	> div {
		display: flex;
		align-items: center;

		p {
			margin-bottom: unset;
			font-size: 1.125rem;
			font-weight: 400;
			color: ${props => props.theme.colors.gray400};
		}

		button {
			all: unset;
			cursor: pointer;

			svg {
				width: 1rem;
				height: 1rem;
				color: ${props => props.theme.colors.green800};
				margin-left: 0.5rem;
				align-self: flex-end;
			}
		}
	}
`;

export const ExpensePaidIcon = styled(CheckCircle).attrs({
	fill: 'fill',
})<IExpensePaidIconProps>`
	color: ${props => (props.isPaid ? props.theme.colors.green800 : props.theme.colors.gray200)};
`;

export const DeleteExpenseIcon = styled(Trash).attrs({
	fill: 'fill',
})`
	color: ${props => props.theme.colors.red500};
`;

export const SharedExpensesTitle = styled(Text)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	font-weight: 500;
	color: ${props => props.theme.colors.gray400};

	&::before,
	&::after {
		content: '';
		flex: 1;
		border-top: 1px solid ${props => props.theme.colors.gray100};
		height: 0;
	}

	&::before {
		margin-right: 1rem;
	}

	&::after {
		margin-left: 1rem;
	}
`;
