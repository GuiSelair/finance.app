import styled from "styled-components";
import { Column } from "@/components/shared/Form";

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

			&:hover,&:focus {
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