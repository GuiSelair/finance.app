import type { AppProps } from 'next/app';

import { GlobalStyles } from '../styles/global';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Component {...pageProps} />
			<GlobalStyles />
		</>
	);
}
