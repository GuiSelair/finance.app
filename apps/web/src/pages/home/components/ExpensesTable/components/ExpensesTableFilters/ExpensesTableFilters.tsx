import { Funnel as FunnelIcon, MagnifyingGlass as MagnifyingGlassIcon } from 'phosphor-react';

import { TextInput } from '@/components/Form/TextInput';
import { Button, Checkbox, Flex, Popover, Spinner, Text } from '@/components';

import {
	FilterButton,
	FilterContainer,
	FilterMenuContainer,
	FilterMenuContent,
	FilterMenuHeader,
} from './ExpensesTableFilters.styles';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useListCardsApi } from '@/hooks/api/cards/useListCards.api';

type Filter = {
	type: 'search';
	value: string;
};

type OnModifyFilterOnSearchParams = (filter: Filter) => void;

export function ExpensesFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleModifyFilterOnSearchParams(filter: Filter) {
		const params = new URLSearchParams(searchParams.toString());
		const isValueEmptyOrRemoved = !filter.value?.trim();

		if (isValueEmptyOrRemoved) {
			params.delete(filter.type);
		} else {
			params.set(filter.type, filter.value);
		}

		const hasFilters = params.toString() !== '';
		router.push(hasFilters ? `?${params.toString()}` : '');
	}

	return (
		<FilterContainer>
			<SearchBar onModifyFilterOnSearchParams={handleModifyFilterOnSearchParams} />
			<Popover overlay={<FilterMenu />} sideOffset={8} maxWidth={800}>
				<FilterButton type="button">
					<FunnelIcon size={24} />
					Filtros
				</FilterButton>
			</Popover>
		</FilterContainer>
	);
}

function SearchBar({ onModifyFilterOnSearchParams }: { onModifyFilterOnSearchParams: OnModifyFilterOnSearchParams }) {
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 700);

	useEffect(() => {
		onModifyFilterOnSearchParams({ type: 'search', value: debouncedSearch });
	}, [debouncedSearch]);

	return (
		<TextInput
			icon={() => <MagnifyingGlassIcon size={24} />}
			placeholder="Pesquise pelo nome da despesa"
			value={search}
			onChange={e => setSearch(e.target.value)}
		/>
	);
}

function FilterMenu() {
	const { data: cards, isLoading: isLoadingCards } = useListCardsApi();

	return (
		<FilterMenuContainer>
			<FilterMenuHeader>
				<Text size="medium" weight="600" color="green800">
					Filtros
				</Text>
				<Button type="button" size="sm" variant="ghost">
					Aplicar
				</Button>
			</FilterMenuHeader>
			<FilterMenuContent>
				<Flex flexDirection="column" gap="0.5rem">
					<Text size="xs">Meios de pagamentos:</Text>
					{isLoadingCards ? (
						<Spinner size="sm" />
					) : (
						<Flex flexDirection="column" gap="0.25rem">
							{cards?.map(card => (
								<Checkbox key={card.id} id={card.id}>
									<Checkbox.Label>{card.name}</Checkbox.Label>
								</Checkbox>
							))}
						</Flex>
					)}
				</Flex>
				<Flex flexDirection="column" gap="0.5rem">
					<Text size="xs">Exibir despesas:</Text>
					<Flex flexDirection="column" gap="0.25rem">
						<Checkbox id="unique">
							<Checkbox.Label>Únicas</Checkbox.Label>
						</Checkbox>
						<Checkbox id="multiple">
							<Checkbox.Label>Recorrentes</Checkbox.Label>
						</Checkbox>
						<Checkbox id="fixed">
							<Checkbox.Label>Fixas</Checkbox.Label>
						</Checkbox>
					</Flex>
				</Flex>
			</FilterMenuContent>
		</FilterMenuContainer>
	);
}
