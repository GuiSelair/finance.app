import { TextInput } from '@/components/shared/Form';
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
`;

interface BaseDisplayFormProps {
	margin?: string;
	padding?: string;
	alignItems?: 'center' | 'flex-start' | 'flex-end';
	width?: string;
	gap?: string;
}

export const BaseDisplayForm = styled.div<BaseDisplayFormProps>`
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
	display: flex;
	align-items: ${({ alignItems }) => alignItems};
	width: ${({ width }) => width};
	gap: ${({ gap }) => gap};
`;

export const Row = styled(BaseDisplayForm)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
`;

export const Column = styled(BaseDisplayForm)`
	display: flex;
	flex-direction: column;
`;

export const FieldDescription = styled.span`
	display: block;
	font-size: 0.875rem;
	font-weight: 300;
	line-height: 16px;
	color: ${({ theme }) => theme.colors.gray300};
	margin-top: 0.25rem;

	strong {
		font-weight: 500;
		color: ${({ theme }) => theme.colors.green600};
		margin-left: 0.5rem;
		display: inline-flex;
		align-items: center;

		a {
			display: inline-flex;
			align-items: center;

			&:focus {
				text-decoration: underline;
			}
		}

		svg {
			width: 0.875rem;
			height: 0.875rem;
			margin-left: 0.5rem;
		}
	}
`;

export const CardDetails = styled(Column)`
	margin-left: 1.5rem;
	align-self: flex-start;
	gap: 1rem;

	span {
		font-weight: 400;
		color: ${({ theme }) => theme.colors.gray600};
	}

	p {
		color: ${({ theme }) => theme.colors.green800};
		font-weight: 400;
	}

	strong {
		color: ${({ theme }) => theme.colors.green800};
		font-weight: 600;
	}
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
