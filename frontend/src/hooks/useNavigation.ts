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
		navigation: [
			{
				defaultActive: true,
				path: '/add/expenses',
				name: 'Despesas',
			},
			{
				path: '/add/cards',
				name: 'Cartões',
			},
		],
	},
	add: {
		title: 'CADASTROS',
		navigation: [
			{
				defaultActive: true,
				path: '/add/expenses',
				name: 'Despesas',
			},
			{
				path: '/add/cards',
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
		pathname.split('/')[0] === '' ? 'home' : pathname.split('/')[0];

	return {
		primaryPageSelected,
		sessionNavigationMap: navigationMap[primaryPageSelected],
	};
}
