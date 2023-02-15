import { useRouter } from 'next/router';
import {
	SessionContainer,
	SessionDetails,
	Welcome,
} from '@/styles/layouts/session.style';

interface SessionLayoutProps {
	children: React.ReactNode;
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
}: SessionLayoutProps) => {
	const { pathname } = useRouter();

	return (
		<SessionContainer>
			<SessionDetails>
				<h1>{title}</h1>
				{pathname === '/' && (
					<Welcome>
						Bom dia, <strong>Guilherme</strong>
					</Welcome>
				)}
			</SessionDetails>
			<div></div>
		</SessionContainer>
	);
};
