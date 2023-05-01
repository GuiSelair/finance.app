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
}

export const BaseDisplayForm = styled.div<BaseDisplayFormProps>`
	margin: ${({ margin }) => margin};
	padding: ${({ padding }) => padding};
	display: flex;
	align-items: ${({ alignItems }) => alignItems};
	width: ${({ width }) => width};
`;

export const Row = styled(BaseDisplayForm)`
	display: flex;
	align-items: center;
`;

export const Column = styled(BaseDisplayForm)`
	display: flex;
	flex-direction: column;
`;

export const FieldLabel = styled.label`
	font-weight: 400;
	color: ${({ theme }) => theme.colors.gray600};

	span {
		display: block;
		margin-bottom: 0.5rem;
	}
`;

export const FieldDescription = styled.span`
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
		}

		svg {
			width: 0.875rem;
			height: 0.875rem;
			margin-left: 0.5rem;
		}
	}
`;
