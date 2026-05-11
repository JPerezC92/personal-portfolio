import React from 'react';
import { TiHtml5, TiCss3 } from 'react-icons/ti';
import { SiJavascript, SiReact, SiTypescript, SiNextdotjs, SiExpress, SiNestjs, SiPrisma } from 'react-icons/si';
import { FaGitAlt, FaNodeJs } from 'react-icons/fa';

type IconComponent = React.ComponentType<{ color?: string; className?: string; size?: number | string }>;

const iconMap: Record<string, IconComponent> = {
  TiHtml5,
  TiCss3,
  SiJavascript,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiNestjs,
  SiPrisma,
  FaGitAlt,
  FaNodeJs,
};

export function resolveIcon(name: string, color?: string): React.ReactElement {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`resolveIcon: unknown icon "${name}"`);
    }
    return <span aria-hidden='true' />;
  }
  return <IconComponent color={color} />;
}
