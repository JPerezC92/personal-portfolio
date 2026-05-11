'use client';

import React from 'react';

import { useSkillList } from '@/modules/skills/hooks/use-skill-list';
import { resolveIcon } from '@/shared/utils/resolve-icon';
import { Icon } from '@/shared/components/Icon/Icon';
import { Text } from '@/shared/components/Text/Text';
import { cn } from '@/shared/utils/cn';

export function SkillList() {
  const skills = useSkillList();

  return (
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
  );
}
