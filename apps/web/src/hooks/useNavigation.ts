import { NavigationContent, navigationMapper, PrincipalNavigationRoutes } from '@/constants/navigation';
import { useRouter } from 'next/router';

interface MakePathProps {
	primaryPageToSelect: string;
	navigationToSelect: NavigationContent;
}

export function useNavigation() {
	const { pathname } = useRouter();

	const primaryPageSelected = pathname.split('/')?.[1] === '' ? 'home' : pathname.split('/')[1];
	const sessionPageSelected = pathname.split('/')?.[2];

	function makePath({ primaryPageToSelect, navigationToSelect }: MakePathProps) {
		const basePath = primaryPageToSelect === 'home' ? '/' : `/${primaryPageToSelect}/`;

		if (navigationToSelect?.navigation?.length) {
			const sessionDefaultActivePage = navigationToSelect.navigation.filter(
				sessionPage => sessionPage.defaultActive === true,
			);

			if (sessionDefaultActivePage.length) {
				return `${basePath}${sessionDefaultActivePage[0].path}`;
			}

			return `${basePath}${navigationToSelect.navigation[0].path}`;
		}

		return basePath;
	}

	return {
		primaryPageSelected,
		primaryNavigationMapper: navigationMapper,
		sessionPageSelected,
		sessionNavigationMapper: navigationMapper[primaryPageSelected as PrincipalNavigationRoutes],
		makePath,
	};
}
