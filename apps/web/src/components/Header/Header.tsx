import Image from 'next/image';
import { SignOut as SignOutIcon } from 'phosphor-react';

import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/NavLink';
import { HeaderContainer, Logo, AddExpenseLink, SystemOptions } from './Header.styles';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '@/contexts/AuthContext';
import { Dropmenu } from '../Dropmenu';
import { Flex } from '../Flex';
import { Text } from '../Text';

export function Header(): JSX.Element {
	const { primaryPageSelected, primaryNavigationMapper, makePath } = useNavigation();
	const onSignOut = useContextSelector(AuthContext, context => context.onSignOut);

	return (
		<HeaderContainer>
			<div>
				<Logo href="/">
					<strong>Finance</strong>.app
				</Logo>
				<nav>
					{Object.entries(primaryNavigationMapper).map(
						([primaryPagesKey, value]) =>
							(value?.visible ?? true) && (
								<NavLink
									key={primaryPagesKey}
									href={makePath({
										primaryPageToSelect: primaryPagesKey,
										navigationToSelect: value,
									})}
									prefetch={false}
									isActive={primaryPageSelected === primaryPagesKey}
								>
									{value.name ?? value.title.toLowerCase()}
								</NavLink>
							),
					)}
				</nav>
			</div>
			<div>
				<AddExpenseLink href="/registrations/expenses" prefetch={false}>
					Adicionar despesa
				</AddExpenseLink>
				<SystemOptions>
					<Dropmenu.Root>
						<Dropmenu.Trigger>
							<Image src="http://www.github.com/guiselair.png" alt="" width={48} height={48} />
						</Dropmenu.Trigger>
						<Dropmenu.Content>
							<Dropmenu.Item onSelect={onSignOut}>
								<Flex gap="4px" alignItems="center">
									<SignOutIcon />
									<Text weight="500">Sair</Text>
								</Flex>
							</Dropmenu.Item>
						</Dropmenu.Content>
					</Dropmenu.Root>
				</SystemOptions>
			</div>
		</HeaderContainer>
	);
}
