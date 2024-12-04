export const defaultTheme = {
	colors: {
		white: '#FFF',

		green100: '#EBF2F2',
		green200: '#99E2B4',
		green300: '#67B99A',
		green400: '#469D89',
		green500: '#248277',
		green600: '#14746F',
		green800: '#036666',

		gray100: '#E1E1E6',
		gray200: '#C4C4CC',
		gray300: '#7C7C8A',
		gray400: '#323238',
		gray500: '#29292E',
		gray600: '#202024',
		gray900: '#121214',

		red100: '#fee2e2',
		red200: '#fecaca',
		red300: '#fca5a5',
		red400: '#f87171',
		red500: '#ef4444',
		red600: '#dc2626',
		red700: '#b91c1c',
		red800: '#991b1b',
		red900: '#7f1d1d',

		orange100: '#ffedd5',
		orange200: '#fed7aa',
		orange300: '#fdba74',
		orange400: '#fb923c',
		orange500: '#f97316',
		orange600: '#ea580c',
		orange700: '#c2410c',
		orange800: '#9a3412',
		orange900: '#7c2d12',
	},

	fontSizes: {
		xs: '0.75rem', //12px
		small: '0.875rem', //14px
		regular: '1rem', //16px
		'semi-medium': '1.125rem', //18px
		medium: '1.5rem', //24px
		large: '2rem', //32px
		xl: '2.5rem', //40px
		'2xl': '3.375rem', //54px
	},

	radius: {
		small: '4px',
		regular: '8px',
		large: '16px',
	},
} as const;
