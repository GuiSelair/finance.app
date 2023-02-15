import styled from 'styled-components';

export const SessionContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin: 3.375rem 0 4rem;
`;

export const SessionDetails = styled.div`
	display: flex;
	align-items: center;

	h1 {
		font-size: ${props => props.theme.fontSizes['2xl']};
		color: ${props => props.theme.colors.white};
		font-weight: 600;
		line-height: 100%;
		letter-spacing: -0.05em;
		display: inline-block;
	}
`;

export const Welcome = styled.span`
	margin-left: 1rem;
	padding-left: 0.5rem;
	border-left: 1px solid ${props => props.theme.colors.green200};
	font-size: ${props => props.theme.fontSizes.medium};
	color: ${props => props.theme.colors.green200};
	line-height: 100%;
	letter-spacing: -0.05em;

	> strong {
		font-weight: 700;
	}
`;
