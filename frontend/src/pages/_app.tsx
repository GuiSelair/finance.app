import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { defaultTheme } from '@/styles/theme/default';
import { GlobalStyles } from '@/styles/global';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalStyles />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
