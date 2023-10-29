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
	alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
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

export const FooterForm = styled.footer`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;