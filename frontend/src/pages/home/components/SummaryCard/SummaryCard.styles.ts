import styled from 'styled-components';

const summaryCardVariants = {
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

interface SummaryCardProps {
	variant: 'info' | 'error' | 'success';
}

export const SummaryCardContainer = styled.article<SummaryCardProps>`
	background: ${props => props.theme.colors.white};
	display: flex;
	flex-direction: column;
	padding: 1rem;
	border-radius: 8px;
	position: relative;
	color: ${props => summaryCardVariants[props.variant].text};

	> header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.5rem;

		> div {
			background: ${props =>
				summaryCardVariants[props.variant].headerBackground};
		}
	}
`;

export const IconContainer = styled.div`
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
`;

export const OptionsContainer = styled.div`
	position: absolute;
	top: 16px;
	right: 16px;
`;

export const CardContent = styled.section`
	display: flex;
	flex-direction: column;

	> span {
		font-weight: 500;
		display: block;
		margin-bottom: 0.5rem;
	}
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
