'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { routing } from '@/i18n/routing';
import { cn } from '@/shared/utils/cn';

const localeLabels: Record<string, string> = {
	es: 'ES',
	en: 'EN',
};

export const LocaleSwitcher: React.FC = () => {
	const pathname = usePathname();
	const currentLocale = pathname.split('/')[1] || routing.defaultLocale;

	function getLocalizedHref(targetLocale: string) {
		const segments = pathname.split('/');
		segments[1] = targetLocale;
		return segments.join('/');
	}

	return (
		<div className='relative flex gap-0.5 rounded-md border border-secondary-400/30 bg-secondary-400/5 p-0.5'>
			{routing.locales.map((l) => (
				<Link
					key={l}
					href={getLocalizedHref(l)}
					className={cn(
						'relative z-10 rounded px-2.5 py-0.5 text-xs font-semibold font-exo2 tracking-wider transition-colors duration-200 no-underline min-w-[2rem] text-center',
						l === currentLocale
							? 'text-secondary-900'
							: 'text-secondary-200 hover:text-secondary-100',
					)}
				>
					{l === currentLocale && (
						<motion.span
							layoutId='locale-indicator'
							className='absolute inset-0 rounded bg-secondary-400'
							transition={{ type: 'spring', stiffness: 400, damping: 30 }}
						/>
					)}
					<span className='relative z-10'>
						{localeLabels[l] ?? l.toUpperCase()}
					</span>
				</Link>
			))}
		</div>
	);
};
