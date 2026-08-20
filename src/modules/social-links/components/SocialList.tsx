'use client';

import { Briefcase, Code, type LucideIcon, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useSocialList } from '@/modules/social-links/hooks/use-social-list';
import { Button } from '@/shared/components/ui/button';

const SOCIAL_ICONS: Record<string, LucideIcon> = {
	Code,
	Briefcase,
	Mail,
};

export function SocialList() {
	const socialLinks = useSocialList();

	return (
		<>
			{socialLinks.map(({ link, icon, title }) => {
				const Icon = SOCIAL_ICONS[icon];
				if (!Icon) {
					if (process.env.NODE_ENV !== 'production') {
						console.warn(`SocialList: unknown icon "${icon}"`);
					}
					return null;
				}
				return (
					<Button
						key={title}
						asChild
						colorScheme='secondary'
						variant='outline'
						size='icon'
						aria-label={title}
					>
						<Link href={link} title={title}>
							<Icon />
						</Link>
					</Button>
				);
			})}
		</>
	);
}
