import Link from 'next/link';

import { Button } from '@/components/Button';
import { LayoutBox } from '@/components/LayoutBox';
import { SEO } from '@/components/SEO';
import { DataTable } from '@/components/DataTable';
import { Spinner } from '@/components/Spinner';
import { Flex } from '@/components/Flex';

import { useCardTotalizer } from './hooks/useCardTotalizer';

export default function CardTotalizerPage() {
	const { cardTotalizerTableColumns, cardTotalizerTableData, isLoadingTableContent } = useCardTotalizer();

	return (
		<>
			<SEO title="Resumo por cartões" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Resumo por cartões</LayoutBox.HeaderTitle>
					<LayoutBox.HeaderButtonsContainer>
						<Link href={'/registrations/cards'}>
							<Button variant="ghost" size="md">
								Criar cartão
							</Button>
						</Link>
					</LayoutBox.HeaderButtonsContainer>
				</LayoutBox.Header>
				<LayoutBox.Content>
					{isLoadingTableContent ? (
						<Flex height="200px" flexDirection="column" alignItems="center" justifyContent="center" gap="32px">
							<Spinner />
							<span>Buscando resumo...</span>
						</Flex>
					) : (
						<DataTable columns={cardTotalizerTableColumns} data={cardTotalizerTableData} />
					)}
				</LayoutBox.Content>
			</LayoutBox>
		</>
	);
}
