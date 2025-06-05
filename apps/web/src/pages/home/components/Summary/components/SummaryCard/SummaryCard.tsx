import React, { useMemo } from 'react';

import { formatCurrency } from '@/helpers/formatCurrency';
import { Spinner } from '@/components';

import {
	SummaryCardContainer,
	CircularIconContainer,
	SummaryCardContent,
	PriceContainer,
	SummaryCardHeader,
	SummaryCardTitle,
} from './SummaryCard.styles';

interface ISummaryCardProps {
	icon?: React.ReactNode;
	title: string;
	value: number;
	variant?: 'info' | 'error' | 'success';
	isLoading?: boolean;
	optionsComponent?: React.ReactNode;
}

export function SummaryCard({
	title,
	value,
	icon,
	variant,
	isLoading = false,
	optionsComponent,
}: Readonly<ISummaryCardProps>) {
	const priceFormatted = formatCurrency(value)?.replace('R$', '');
	const shouldShowHeader = !!icon;

	const BaseSummaryCard = useMemo(() => {
		return function BaseSummaryCard({ children }: { children: React.ReactNode }) {
			return (
				<SummaryCardContainer variant={variant ?? 'info'}>
					{shouldShowHeader && (
						<SummaryCardHeader>
							<CircularIconContainer>{icon}</CircularIconContainer>
							{optionsComponent}
						</SummaryCardHeader>
					)}
					<SummaryCardContent>
						<SummaryCardTitle>{title}</SummaryCardTitle>
						<PriceContainer>
							<span>R$</span>
							{children}
						</PriceContainer>
					</SummaryCardContent>
				</SummaryCardContainer>
			);
		};
	}, [shouldShowHeader, variant, icon, title, optionsComponent]);

	if (isLoading) {
		return (
			<BaseSummaryCard>
				<Spinner size="md" mode="same-color" style={{ marginLeft: 8 }} />
			</BaseSummaryCard>
		);
	}

	return (
		<BaseSummaryCard>
			<strong>{priceFormatted}</strong>
		</BaseSummaryCard>
	);
}
