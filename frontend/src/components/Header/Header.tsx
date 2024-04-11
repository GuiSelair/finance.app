import Image from 'next/image';
import Link from 'next/link';
import { Gear } from 'phosphor-react';

import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/NavLink';
import {
	HeaderContainer,
	Logo,
	AddExpenseLink,
	SystemOptions,
} from './Header.styles';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '@/contexts/AuthContext';

export function Header(): JSX.Element {
	const { primaryPageSelected, primaryNavigationMap, makePath } =
		useNavigation();
	const onSignOut = useContextSelector(
		AuthContext,
		context => context.onSignOut,
	);

	return (
		<HeaderContainer>
			<div>
				<Logo href="/">
					<strong>Finance</strong>.app
				</Logo>
				<nav>
					{Object.entries(primaryNavigationMap).map(
						([key, value]) =>
							value.visible && (
								<NavLink
									key={key}
									href={makePath({
										primaryPageToSelect: key,
										navigationToSelect: value,
									})}
									prefetch={false}
									isActive={primaryPageSelected === key}
								>
									{value.name ?? value.title.toLowerCase()}
								</NavLink>
							),
					)}
				</nav>
			</div>
			<div>
				<AddExpenseLink href="/add/expenses" prefetch={false}>
					Adicionar despesa
				</AddExpenseLink>
				<SystemOptions>
					<Link href="/config">
						<Gear size={24} />
					</Link>
					<button type="button" onClick={onSignOut}>
						<Image
							src="http://www.github.com/guiselair.png"
							alt=""
							width={48}
							height={48}
						/>
					</button>
				</SystemOptions>
			</div>
		</HeaderContainer>
	);
}
