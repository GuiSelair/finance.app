import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Gear } from 'phosphor-react';

import {
	HeaderContainer,
	Logo,
	LinkToPage,
	AddExpenseLink,
	SystemOptions,
} from './styles';

export function Header(): JSX.Element {
	const { pathname } = useRouter();

	const primaryPageSelected = pathname.split('/')[0];

	return (
		<HeaderContainer>
			<div>
				<Logo href="/">
					<strong>Finance</strong>.app
				</Logo>
				<nav>
					<LinkToPage
						href="/"
						prefetch={false}
						active={primaryPageSelected === ''}
					>
						Dashboard
					</LinkToPage>
					<LinkToPage
						href="/cards"
						prefetch={false}
						active={primaryPageSelected === 'cards'}
					>
						Cartões
					</LinkToPage>
					<LinkToPage
						href="/division"
						prefetch={false}
						active={primaryPageSelected === 'division'}
					>
						Divisões
					</LinkToPage>
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
