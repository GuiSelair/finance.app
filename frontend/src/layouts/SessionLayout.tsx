import {
	SessionContainer,
	SessionDetails,
	Welcome,
	SessionNavigation,
} from '@/styles/layouts/session.style';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { NavLink } from '@/components/shared/NavLink';

export const SessionLayout = ({ children }: PropsWithChildren) => {
	const { primaryPageSelected, sessionNavigationMap, sessionPageSelected } =
		useNavigation();

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
							href={`/${primaryPageSelected}/${page.path}`}
							isActive={sessionPageSelected === page.path}
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
