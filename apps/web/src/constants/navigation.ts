export interface NavigationContent {
	/** Texto que será exibido como titulo da tela.  */
	title: string;
	/** Sub-navegação para a rota principal. */
	navigation?: Array<{
		/** Indica se a rota deve inicial selecionada quando a rota principal for selecionada. Por padrão sempre será a primeira */
		defaultActive?: boolean;
		/** Path route para a tela. */
		path: string;
		/** Nome que será exibido no botão da sub-navegação. */
		name: string;
		/** Possibilita customizar cada sub-rota via classname. */
		className?: string;
	}>;
	/** Indifica se a rota principal deve ser exibida ou não.
	 *  @default true
	 */
	visible?: boolean;
	/** Nome que será exibido no botão da navegação principal. Caso não exista atribui o title como texto do botão. */
	name?: string;
}

export type PrincipalNavigationRoutes = 'home' | 'registrations' | 'cards' | 'dividers';
export type NavigationSystemProps = Record<PrincipalNavigationRoutes, NavigationContent>;

export const navigationMapper = {
	home: {
		title: 'DASHBOARD',
		name: 'Dashboard',
	},
	registrations: {
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
			{
				path: 'share-people',
				name: 'Pessoas',
			},
		],
		visible: false,
	},
	cards: {
		title: 'Meios de pagamento',
		navigation: [
			{
				name: 'Totalizadores',
				path: 'totalizers',
				defaultActive: true,
			},
		],
		name: 'Cartões',
	},
	dividers: {
		title: 'Pessoas divisoras',
		name: 'Divisões',
		navigation: [
			{
				name: 'Total p/Pessoa',
				path: '',
			},
			{
				name: 'Cadastros',
				path: 'share-people',
				defaultActive: true,
			},
		],
	},
} as NavigationSystemProps;
