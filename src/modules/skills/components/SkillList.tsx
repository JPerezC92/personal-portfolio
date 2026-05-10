'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { useSkillList } from '@/modules/skills/hooks/use-skill-list';
import { resolveIcon } from '@/shared/utils/resolve-icon';
import { Icon } from '@/shared/components/Icon/Icon';
import { Heading } from '@/shared/components/Heading/Heading';
import { Separator } from '@/shared/components/ui/separator';
import { Text } from '@/shared/components/Text/Text';
import { cn } from '@/shared/utils/cn';

export function SkillList() {
  const skills = useSkillList();
  const t = useTranslations('Skills');

  return (
    <section>
      <Heading component='h2' fontSize='3xl'>
        {t('title')}
      </Heading>

      <Separator className='mt-4 mb-16' />

      <ul
        className={cn(
          'flex flex-wrap justify-evenly gap-x-12 gap-y-8 items-center transition-all duration-300',
          'md:gap-x-24',
          'xl:gap-x-10 xl:justify-between',
        )}
      >
        {skills.map(({ description, icon, color }) => (
          <li
            key={description}
            className='flex flex-col justify-center items-center'
          >
            <Icon
              title={description}
              size='2xl'
              icon={resolveIcon(icon, color)}
            />
            <Text component='span'>{description}</Text>
          </li>
        ))}
      </ul>
    </section>
  );
}
