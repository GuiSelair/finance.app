import Head from 'next/head';

interface ISEOProps {
	title: string;
	description?: string;
	image?: string;
	shouldExcludeTitleSuffix?: boolean;
	shouldIndexPage?: boolean;
	children?: React.ReactNode;
}

export function SEO({
	title,
	description,
	image,
	shouldExcludeTitleSuffix = false,
	shouldIndexPage = true,
	children,
}: Readonly<ISEOProps>) {
	const pageTitle = `${title} ${!shouldExcludeTitleSuffix ? '| finance.app' : ''}`;
	const pageImage = image ? `${image}` : null;

	return (
		<Head>
			<title>{pageTitle}</title>

			{description && <meta content={description} name="description" />}
			{pageImage ? <meta content={pageImage} name="image" /> : null}

			{!shouldIndexPage && <meta content="noindex,nofollow" name="robots" />}

			<meta content="IE=edge,chrome=1" httpEquiv="x-ua-compatible" />
			<meta content="424" name="MobileOptimized" />
			<meta content="True" name="HandheldFriendly" />
			<meta content="#0f2d3b" name="theme-color" />
			<meta content="#0f2d3b" name="msapplication-TileColor" />
			<meta content="no-referrer-when-downgrade" name="referrer" />
			<meta content="notranslate" name="google" />

			<meta content={pageTitle} property="og:title" />
			<meta content={description} property="og:description" />
			<meta content="pt_BR" property="og:locale" />
			<meta content="website" property="og:type" />
			<meta content={pageTitle} property="og:site_name" />

			{pageImage && (
				<>
					<meta content={pageImage} property="og:image" />
					<meta content={pageImage} property="og:image:secure_url" />
					<meta content="Thumbnail" property="og:image:alt" />
					<meta content="image/png" property="og:image:type" />
					<meta content="1200" property="og:image:width" />
					<meta content="630" property="og:image:height" />
				</>
			)}

			{children}
		</Head>
	);
}
