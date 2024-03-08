import { Header } from '@/components/Header';
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
					<SessionLayout>{children}</SessionLayout>
				</BaseContent>
			</BackgroundHero>
		</BaseContainer>
	);
};
