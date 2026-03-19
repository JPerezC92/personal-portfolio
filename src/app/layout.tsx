import './global.css';

import { Exo_2 as Exo2 } from 'next/font/google';

import { cn } from '@/shared/utils/cn';

const exo2 = Exo2({
	subsets: ['latin'],
	display: 'block',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-exo-2',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html data-mode='dark' className={cn(exo2.variable, '!scroll-smooth')}>
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
	);
}
