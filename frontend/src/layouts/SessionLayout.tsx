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

	let time = ""
	const currentTime = new Date()

	const hourMorning = new Date()
	hourMorning.setHours(6)

	const hourAfternoon = new Date()
	hourAfternoon.setHours(12)

	const hourEvening = new Date()
	hourEvening.setHours(17)

	if (currentTime >= hourMorning && currentTime < hourAfternoon) {
		time = 'Bom dia'
	} else if (currentTime >= hourAfternoon && currentTime < hourEvening) {
		time = 'Boa tarde'
	} else {
		time = 'Boa noite'
	}

	return (
		<>
			<SessionContainer>
				<SessionDetails>
					<h1>{sessionNavigationMap?.title}</h1>
					{primaryPageSelected === 'home' && (
						<Welcome>
							{time}, <strong>Guilherme</strong>
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
