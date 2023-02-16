import { useRouter } from 'next/router';

type NavigationProps = Record<
	string,
	{
		title: string;
		navigation: Array<{
			defaultActive?: boolean;
			path: string;
			name: string;
			className?: string;
		}>;
	}
>;

const navigationMap = {
	home: {
		title: 'DASHBOARD',
		navigation: [],
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
	},
	division: {
		title: 'Divisões',
		navigation: [],
	},
} as NavigationProps;

export function useNavigation() {
	const { pathname } = useRouter();

	const primaryPageSelected =
		pathname.split('/')?.[1] === '' ? 'home' : pathname.split('/')[1];

	const sessionPageSelected = pathname.split('/')?.[2];
	console.log(sessionPageSelected);
	return {
		primaryPageSelected,
		sessionPageSelected,
		sessionNavigationMap: navigationMap[primaryPageSelected],
	};
}
