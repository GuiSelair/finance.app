import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { defaultTheme } from '@/styles/theme/default';
import { GlobalStyles } from '@/styles/global';
import { AuthProvider } from '@/contexts/AuthContext';
import { BaseLayout } from '@/layouts/BaseLayout';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<AuthProvider>
				<BaseLayout>
					<Component {...pageProps} />
				</BaseLayout>
			</AuthProvider>
			<ToastContainer />
		</ThemeProvider>
	);
}
