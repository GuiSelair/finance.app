import {
	SessionContainer,
	SessionDetails,
	Welcome,
	SessionNavigation,
} from '@/styles/layouts/session.style';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/shared/NavLink';

interface SessionLayoutProps {
	title: string;
	description?: string;
	navigation?: Array<{
		path: string;
		active: boolean;
		name: string;
		className?: string;
	}>;
}

export const SessionLayout = ({
	children,
	title,
	description,
	navigation,
}: PropsWithChildren<SessionLayoutProps>) => {
	const { primaryPageSelected, sessionNavigationMap } = useNavigation();

	return (
		<>
			<SessionContainer>
				<SessionDetails>
					<h1>{sessionNavigationMap.title}</h1>
					{primaryPageSelected === 'home' && (
						<Welcome>
							Bom dia, <strong>Guilherme</strong>
						</Welcome>
					)}
				</SessionDetails>
				<SessionNavigation>
					{sessionNavigationMap?.navigation?.map(page => (
						<NavLink
							key={page.name}
							href={page.path}
							isActive={page.defaultActive ?? false}
						>
							{page.name}
						</NavLink>
					))}
				</SessionNavigation>
			</SessionContainer>
			{children}
		</>
	);
};
