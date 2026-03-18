import './global.css';

import { Metadata } from 'next';
import { Exo_2 as Exo2 } from 'next/font/google';

import { cn } from '@/shared/utils/cn';
import { EnvironmentVariable } from '@/shared/utils/envVariables';

const exo2 = Exo2({
	subsets: ['latin'],
	display: 'block',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-exo-2',
});

const title = 'Philip Perez Castro | Junior Software Developer';
const description =
	'Soy un apasionado Junior Developer especializado en la creación de experiencias digitales. Tengo amplia experiencia en el desarrollo de sitios web responsivos y optimizados para dispositivos móviles utilizando HTML5, CSS3, JavaScript, React y Next.js. Siempre me mantengo actualizado con las últimas tendencias y mejores prácticas del desarrollo frontend, con el objetivo de ofrecer soluciones innovadoras y eficientes.';

export const metadata: Metadata = {
	title,
	description,
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
		canonical: '/',
		languages: {
			'es-PE': '/',
		},
	},
	openGraph: {
		title,
		description,
		type: 'website',
		locale: 'es_PE',
		url: '/',
		siteName: title,
		images: [
			{
				url: '/og-1200-630.webp',
				alt: title,
				type: 'image/webp',
				width: 1200,
				height: 630,
			},
			{
				url: '/og-800-600.webp',
				alt: title,
				type: 'image/webp',
				width: 800,
				height: 600,
			},
			{
				url: '/og-630-630.webp',
				alt: title,
				type: 'image/webp',
				width: 630,
				height: 630,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		creator: '@jperez.c92',
		images: ['/og-1200-630.webp'],
	},
	icons: { icon: [{ url: '/favicon.ico' }] },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html
				lang='es'
				data-mode='dark'
				className={cn(exo2.variable, '!scroll-smooth')}
			>
				<body className='contents'>
					<div
						className={cn(
							'bg-primary-50 dark:bg-primary-950/80',
							"before:content-[''] before:fixed before:inset-0 before:bg-[url('/body-bg.webp')] before:-z-[1] before:blur-[2px] before:bg-cover before:bg-center before:rotate-180",
						)}
					>
						{children}
					</div>
				</body>
			</html>
		</>
	);
}
