import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next/types';

import { defaultTheme } from '@/styles/theme/default';
import { GlobalStyles } from '@/styles/global';
import { AuthProvider } from '@/contexts/AuthContext';
import { BaseLayout } from '@/layouts/BaseLayout';

type CustomComponentProps<P = Record<string, never>> = NextPage<P> & {
	notUseLayout?: boolean;
};

type CustomAppProps = AppProps & {
	Component: CustomComponentProps;
};

export default function App({
	Component,
	pageProps,
}: CustomAppProps): JSX.Element {
	const LayoutOrNot = Component.notUseLayout ? Fragment : BaseLayout;

	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<AuthProvider>
				<LayoutOrNot>
					<Component {...pageProps} />
				</LayoutOrNot>
			</AuthProvider>
			<ToastContainer />
		</ThemeProvider>
	);
}
