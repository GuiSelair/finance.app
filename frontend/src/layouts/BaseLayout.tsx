import { Header } from '@/components/shared/Header';
import { SessionLayout } from '@/layouts/SessionLayout';

import {
	BaseContainer,
	BaseContent,
	BackgroundHero,
} from '@/styles/layouts/base.style';

interface BaseLayoutProps {
	children: React.ReactNode;
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {

	return (
		<BaseContainer>
			<BackgroundHero>
				<BaseContent>
					<Header />
					<SessionLayout title="Dashboard">{children}</SessionLayout>
				</BaseContent>
			</BackgroundHero>
		</BaseContainer>
	);
};
