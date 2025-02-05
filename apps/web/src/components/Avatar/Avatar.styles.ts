import styled from 'styled-components';

export const AvatarContainer = styled.div``;
export const AvatarFallback = styled.div`
	aspect-ratio: 1/1;
	width: 1.125rem;
	height: 1.125rem;
	border-radius: 99999999%;
	object-fit: cover;
	padding: 0.5rem;
	background: ${({ theme }) => theme.colors.green800};
	color: ${({ theme }) => theme.colors.green100};
	font-size: ${({ theme }) => theme.fontSizes.small};
	font-weight: 600;
`;
