import React from 'react';
import { TiHtml5, TiCss3 } from 'react-icons/ti';
import { SiJavascript, SiReact, SiTypescript, SiNextdotjs, SiExpress, SiNestjs, SiPrisma } from 'react-icons/si';
import { FaGitAlt, FaNodeJs } from 'react-icons/fa';

type IconComponent = React.ComponentType<{ color?: string; className?: string; size?: number | string }>;

const iconMap = {
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
} satisfies Record<string, IconComponent>;

export type SkillIconKey = keyof typeof iconMap;

export function resolveIcon(name: SkillIconKey, color?: string): React.ReactElement {
  const IconComponent = iconMap[name];
  return <IconComponent color={color} />;
}
