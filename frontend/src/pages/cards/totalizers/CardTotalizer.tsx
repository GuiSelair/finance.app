import Link from 'next/link';

import { Button } from '@/components/Button';
import { LayoutBox } from '@/components/LayoutBox';
import { SEO } from '@/components/SEO';
import Table from '@/components/Table';
import { Spinner } from '@/components/Spinner';
import { Box } from '@/components/Box';

import { useCardTotalizer } from './hooks/useCardTotalizer';

export default function CardTotalizerPage() {
	const {
		cardTotalizerTableColumns,
		cardTotalizerTableData,
		isLoadingTableContent,
	} = useCardTotalizer();

	return (
		<>
			<SEO title="Resumo por cartões" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Resumo por cartões</LayoutBox.HeaderTitle>
					<LayoutBox.HeaderButtonsContainer>
						<Link href={'/add/cards'}>
							<Button variant="ghost" size="md">
								Criar cartão
							</Button>
						</Link>
					</LayoutBox.HeaderButtonsContainer>
				</LayoutBox.Header>
				<LayoutBox.Content>
					{isLoadingTableContent ? (
						<Box
							height="200px"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
							gap="32px"
						>
							<Spinner />
							<span>Buscando resumo...</span>
						</Box>
					) : (
						<Table
							columns={cardTotalizerTableColumns}
							data={cardTotalizerTableData}
						/>
					)}
				</LayoutBox.Content>
			</LayoutBox>
		</>
	);
}
