'use client';

import React from 'react';
import Link from 'next/link';
import { Code, Briefcase, Mail, type LucideIcon } from 'lucide-react';

import { useSocialList } from '@/modules/social-links/hooks/use-social-list';
import { Button } from '@/shared/components/ui/button';

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Github: Code,
  Linkedin: Briefcase,
  Mail,
};

export function SocialList() {
  const socialLinks = useSocialList();

  return (
    <>
      {socialLinks.map(({ link, icon, title }) => {
        const Icon = SOCIAL_ICONS[icon];
        if (!Icon) return null;
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
