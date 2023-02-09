import Header from '@/components/shared/Header';
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
					{children}
					{/* <SessionLayout >

				</SessionLayout> */}
				</BaseContent>
			</BackgroundHero>
		</BaseContainer>
	);
};
