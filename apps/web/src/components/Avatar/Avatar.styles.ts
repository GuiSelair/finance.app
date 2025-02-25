import styled from 'styled-components';

export const AvatarContainer = styled.div``;
export const AvatarFallback = styled.div`
	aspect-ratio: 1/1;
	width: 2rem;
	height: 2rem;
	border-radius: 99999999%;
	object-fit: cover;
	background: ${({ theme }) => theme.colors.green800};
	color: ${({ theme }) => theme.colors.green100};
	font-size: ${({ theme }) => theme.fontSizes.small};
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
`;
