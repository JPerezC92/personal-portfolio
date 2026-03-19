import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import { EnvironmentVariable } from '@/shared/utils/envVariables';

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'Metadata' });

	return {
		title: t('title'),
		description: t('description'),
		authors: [
			{
				name: 'Philip Perez Castro',
				url: 'https://pe.linkedin.com/in/jperezc92',
			},
		],
		generator: 'Next.js',
		applicationName: 'Philip Perez Castro Portfolio',
		keywords: [
			'Philip Perez Castro',
			'Frontend developer',
			'web developer',
			'web development',
			'react developer portfolio',
			'react developer',
			'nextjs developer portfolio',
			'nextjs developer',
			'TypeScript',
			'portafolio desarrollador',
		],
		creator: 'Philip Perez Castro',
		publisher: 'Vercel',
		metadataBase: new URL(EnvironmentVariable.WEB_URL),
		alternates: {
			canonical: `/${locale}`,
			languages: Object.fromEntries(
				routing.locales.map((l) => [l, `/${l}`]),
			),
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			type: 'website',
			locale: locale === 'es' ? 'es_PE' : 'en_US',
			url: `/${locale}`,
			siteName: t('title'),
			images: [
				{
					url: '/og-1200-630.webp',
					alt: t('title'),
					type: 'image/webp',
					width: 1200,
					height: 630,
				},
				{
					url: '/og-800-600.webp',
					alt: t('title'),
					type: 'image/webp',
					width: 800,
					height: 600,
				},
				{
					url: '/og-630-630.webp',
					alt: t('title'),
					type: 'image/webp',
					width: 630,
					height: 630,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: t('title'),
			description: t('description'),
			creator: '@jperez.c92',
			images: ['/og-1200-630.webp'],
		},
		icons: { icon: [{ url: '/favicon.ico' }] },
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			{children}
		</NextIntlClientProvider>
	);
}
