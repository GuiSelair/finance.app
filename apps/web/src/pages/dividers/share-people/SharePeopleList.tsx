import { Button, DataTable, LayoutBox, LinkText, Spinner } from '@/components';
import { useSharePeopleList } from './hooks/useSharePeopleList';
import { sharePeopleListColumns } from './constants/sharePeopleListColumns';
import { EmptyStateContainer, EmptyStateText } from './SharePeopleList.styles';
import Link from 'next/link';

export default function SharePeopleListPage() {
	const { sharePeopleList, isLoadingSharePeople, isEmptyState } = useSharePeopleList();

	if (isEmptyState) {
		return (
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Cadastros</LayoutBox.HeaderTitle>
					<LayoutBox.HeaderButtonsContainer>
						<Link href={'/registrations/share-people'}>
							<Button variant="ghost" size="md">
								Adicionar pessoa
							</Button>
						</Link>
					</LayoutBox.HeaderButtonsContainer>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<EmptyStateContainer>
						<EmptyStateText>
							Nenhum pessoa cadastrada até o momento.
							<LinkText text="Cadastre aqui!" href={'/registrations/share-people'} />
						</EmptyStateText>
					</EmptyStateContainer>
				</LayoutBox.Content>
			</LayoutBox>
		);
	}

	return (
		<LayoutBox>
			<LayoutBox.Header>
				<LayoutBox.HeaderTitle>Cadastros</LayoutBox.HeaderTitle>
				<LayoutBox.HeaderButtonsContainer>
					<Link href={'/registrations/share-people'}>
						<Button variant="ghost" size="md">
							Adicionar pessoa
						</Button>
					</Link>
				</LayoutBox.HeaderButtonsContainer>
			</LayoutBox.Header>
			<LayoutBox.Content>
				{isLoadingSharePeople ? (
					<EmptyStateContainer>
						<Spinner size="sm" />
					</EmptyStateContainer>
				) : (
					<DataTable columns={sharePeopleListColumns} data={sharePeopleList} />
				)}
			</LayoutBox.Content>
		</LayoutBox>
	);
}
