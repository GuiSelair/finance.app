import styled from 'styled-components';

export const InputLabel = styled.label`
	font-size: 1rem;
	color: ${props => props.theme.colors.gray600};
	font-weight: 400;
	line-height: 100%;

	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
`;
