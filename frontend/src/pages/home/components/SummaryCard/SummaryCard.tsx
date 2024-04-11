import { DotsThreeVertical, IconProps } from 'phosphor-react';
import {
	SummaryCardContainer,
	IconContainer,
	OptionsContainer,
	CardContent,
	PriceContainer,
} from './SummaryCard.styles';

interface SummaryCardProps {
	icon?: React.ComponentType<IconProps>;
	title: string;
	value: number;
	options?: React.ReactNode;
	variant?: 'info' | 'error' | 'success';
}

export default function SummaryCard({
	title,
	value,
	icon: Icon,
	options,
	variant,
}: SummaryCardProps) {
	const priceFormatted = new Intl.NumberFormat('pt-BR', {
		currency: 'BRL',
		style: 'currency',
		minimumFractionDigits: 2,
		maximumFractionDigits: 3,
	})
		.format(value)
		.replace('R$', '');

	const shouldShowHeader = Icon;

	return (
		<SummaryCardContainer variant={variant ?? 'info'}>
			{shouldShowHeader && (
				<header>
					{Icon && (
						<IconContainer>
							<Icon />
						</IconContainer>
					)}
				</header>
			)}
			<OptionsContainer>
				<DotsThreeVertical weight="bold" size={20} color="#000" />
			</OptionsContainer>
			<CardContent>
				<span>{title}</span>
				<PriceContainer>
					<span>R$</span>
					<strong>{priceFormatted}</strong>
				</PriceContainer>
			</CardContent>
		</SummaryCardContainer>
	);
}
