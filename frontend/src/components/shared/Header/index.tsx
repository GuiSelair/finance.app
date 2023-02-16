import Image from 'next/image';
import Link from 'next/link';
import { Gear } from 'phosphor-react';

import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/shared/NavLink';
import { HeaderContainer, Logo, AddExpenseLink, SystemOptions } from './styles';

export function Header(): JSX.Element {
	const { primaryPageSelected } = useNavigation();

	return (
		<HeaderContainer>
			<div>
				<Logo href="/">
					<strong>Finance</strong>.app
				</Logo>
				<nav>
					<NavLink
						href="/"
						prefetch={false}
						isActive={primaryPageSelected === 'home'}
					>
						Dashboard
					</NavLink>
					<NavLink
						href="/cards"
						prefetch={false}
						isActive={primaryPageSelected === 'add'}
					>
						Cartões
					</NavLink>
					<NavLink
						href="/division"
						prefetch={false}
						isActive={primaryPageSelected === 'division'}
					>
						Divisões
					</NavLink>
				</nav>
			</div>
			<div>
				<AddExpenseLink href="/add/expenses" prefetch={false}>
					Criar despesa
				</AddExpenseLink>
				<SystemOptions>
					<Link href="/config">
						<Gear size={24} />
					</Link>
					<button type="button">
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
