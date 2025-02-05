import { DataTable, LayoutBox } from '@/components';
import { useSharePeopleList } from './hooks/useSharePeopleList';
import { sharePeopleListColumns } from './constants/sharePeopleListColumns';

export default function SharePeopleListPage() {
	const { sharePeopleList } = useSharePeopleList();
	return (
		<LayoutBox>
			<LayoutBox.Header>
				<LayoutBox.HeaderTitle>Cadastros</LayoutBox.HeaderTitle>
			</LayoutBox.Header>
			<LayoutBox.Content>
				<DataTable columns={sharePeopleListColumns} data={sharePeopleList} />
			</LayoutBox.Content>
		</LayoutBox>
	);
}
