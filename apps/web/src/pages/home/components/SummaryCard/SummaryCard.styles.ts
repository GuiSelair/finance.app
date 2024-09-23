import styled from 'styled-components';

const summaryCardVariantsMapper = {
	info: {
		text: '#075985',
		headerBackground: '#e0f2fe',
	},
	error: {
		text: '#9D4646',
		headerBackground: '#FFD9D9',
	},
	success: {
		text: '#14746F',
		headerBackground: '#EBF2F2',
	},
};

interface ISummaryCardProps {
	variant: keyof typeof summaryCardVariantsMapper;
}

export const CircularIconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	width: 40px;
	height: 40px;
`;

export const SummaryCardContainer = styled.article.withConfig({
	shouldForwardProp: prop => !['variant'].includes(prop),
})<ISummaryCardProps>`
	background: ${props => props.theme.colors.white};
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: 8px;
	position: relative;
	color: ${props => summaryCardVariantsMapper[
		props.variant as keyof typeof summaryCardVariantsMapper
	].text};

	${CircularIconContainer} {
		background: ${props =>
			summaryCardVariantsMapper[props.variant as keyof typeof summaryCardVariantsMapper].headerBackground};
	}
`;

export const SummaryCardHeader = styled.header`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1.5rem;
`;

export const SummaryCardContent = styled.section`
	display: flex;
	flex-direction: column;
`;

export const SummaryCardTitle = styled.span`
	font-weight: 500;
	display: block;
	margin-bottom: 0.5rem;
	font-size: 1.25rem;
`;

export const PriceContainer = styled.div`
	font-size: 2.5rem;
	line-height: 100%;

	> span {
		font-weight: 300;
	}

	> strong {
		font-weight: 600;
	}
`;
