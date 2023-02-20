import { useRouter } from 'next/router';

interface NavigationContent {
	title: string;
	navigation: Array<{
		defaultActive?: boolean;
		path: string;
		name: string;
		className?: string;
	}>;
	visible: boolean;
	name?: string;
}

type NavigationMapProps = Record<string, NavigationContent>;

const navigationMap = {
	home: {
		title: 'DASHBOARD',
		navigation: [],
		visible: true,
		name: 'Dashboard',
	},
	add: {
		title: 'CADASTROS',
		navigation: [
			{
				defaultActive: true,
				path: 'expenses',
				name: 'Despesas',
			},
			{
				path: 'cards',
				name: 'Cartões',
			},
		],
		visible: false,
		name: 'Cadastros',
	},
	division: {
		title: 'Divisões',
		navigation: [],
		visible: true,
		name: 'Divisões',
	},
} as NavigationMapProps;

interface MakePathProps {
	navigationToSelect: NavigationContent;
	primaryPageToSelect: string;
}

export function useNavigation() {
	const { pathname } = useRouter();

	const primaryPageSelected =
		pathname.split('/')?.[1] === '' ? 'home' : pathname.split('/')[1];

	const sessionPageSelected = pathname.split('/')?.[2];

	const makePath = ({
		primaryPageToSelect,
		navigationToSelect,
	}: MakePathProps) => {
		const basePath =
			primaryPageToSelect === 'home' ? '' : `/${primaryPageToSelect}`;

		if (navigationToSelect.navigation.length) {
			const sessionDefaultActivePage = navigationToSelect.navigation.filter(
				sessionPage => sessionPage.defaultActive === true,
			);

			if (sessionDefaultActivePage.length) {
				return `${basePath}/${sessionDefaultActivePage[0].path}`;
			}

			return `${basePath}/${navigationToSelect.navigation[0].path}`;
		}

		return `${basePath === '' ? '/' : basePath}`;
	};

	return {
		primaryPageSelected,
		primaryNavigationMap: navigationMap,
		sessionPageSelected,
		sessionNavigationMap: navigationMap[primaryPageSelected],
		makePath,
	};
}
