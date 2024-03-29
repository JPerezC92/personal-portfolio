import type { AppProps } from 'next/app';
import { globalStyles } from 'stitches.config';
import 'styles/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
	globalStyles();
	return <Component {...pageProps} />;
}

export default MyApp;
