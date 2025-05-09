import { DataTable, LayoutBox, SEO, Spinner } from '@/components';

import { useTotalPerPerson } from './hooks/useTotalPerPerson';
import { totalPerPersonColumns } from './constants/totalPerPersonColumns';
import { EmptyStateContainer, EmptyStateText } from './TotalPerPerson.styles';

export default function TotalPerPersonPage() {
	const { totalPerPersonList, isLoadingTotalPerPerson, isEmptyState } = useTotalPerPerson();

	return (
		<>
			<SEO title="Total por pessoa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Total por pessoa</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				{isEmptyState ? (
					<LayoutBox.Content>
						<EmptyStateContainer>
							<EmptyStateText>Nenhuma divisão para este mês.</EmptyStateText>
						</EmptyStateContainer>
					</LayoutBox.Content>
				) : (
					<LayoutBox.Content>
						{isLoadingTotalPerPerson ? (
							<EmptyStateContainer>
								<Spinner size="sm" />
							</EmptyStateContainer>
						) : (
							<DataTable columns={totalPerPersonColumns} data={totalPerPersonList} />
						)}
					</LayoutBox.Content>
				)}
			</LayoutBox>
		</>
	);
}
