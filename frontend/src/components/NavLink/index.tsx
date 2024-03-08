import { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';
import { LinkToPage } from './styles';

interface NavLinkProps extends LinkProps {
	href: string;
	isActive: boolean;
}

export function NavLink({
	href,
	isActive,
	children,
}: PropsWithChildren<NavLinkProps>) {
	return (
		<LinkToPage href={href} prefetch={false} active={isActive ? 1 : 0}>
			{children}
		</LinkToPage>
	);
}
