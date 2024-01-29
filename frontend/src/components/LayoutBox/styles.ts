import styled from 'styled-components';

export const LayoutBoxContainer = styled.main`
	background: ${props => props.theme.colors.white};
	padding: 1.5rem;
	border-radius: 8px;
	min-height: 500px;
`;

export const LayoutBoxTitle = styled.h2`
	font-weight: 600;
	font-size: 2rem;
	line-height: 100%;
	letter-spacing: -0.05em;
	color: ${({ theme }) => theme.colors.green800};
	margin-bottom: 1.5rem;
`;
