import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
import { NextPage } from 'next/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { defaultTheme } from '@/styles/theme/default';
import { GlobalStyles } from '@/styles/global';
import { AuthProvider, SelectedMonthYearProvider } from '@/contexts';
import { BaseLayout } from '@/layouts/BaseLayout';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
		},
	},
});

type CustomComponentProps<P = Record<string, never>> = NextPage<P> & {
	notUseLayout?: boolean;
};

type CustomAppProps = AppProps & {
	Component: CustomComponentProps;
};

export default function App({ Component, pageProps }: CustomAppProps): JSX.Element {
	const LayoutOrNot = Component.notUseLayout ? Fragment : BaseLayout;

	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<LayoutOrNot>
						<SelectedMonthYearProvider>
							<Component {...pageProps} />
						</SelectedMonthYearProvider>
					</LayoutOrNot>
				</QueryClientProvider>
			</AuthProvider>
			<ToastContainer position="bottom-right" theme="light" />
		</ThemeProvider>
	);
}
