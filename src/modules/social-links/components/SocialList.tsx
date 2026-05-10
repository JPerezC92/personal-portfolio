'use client';

import React from 'react';
import Link from 'next/link';

import { useSocialList } from '@/modules/social-links/hooks/use-social-list';
import { resolveIcon } from '@/shared/utils/resolve-icon';
import { Button } from '@/shared/components/ui/button';

export function SocialList() {
  const socialLinks = useSocialList();

  return (
    <>
      {socialLinks.map(({ link, icon, title }) => (
        <Button
          key={title}
          asChild
          colorScheme='secondary'
          variant='outline'
          size='icon'
        >
          <Link href={link} title={title}>
            {resolveIcon(icon)}
          </Link>
        </Button>
      ))}
    </>
  );
}
