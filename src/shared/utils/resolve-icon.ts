import React from 'react';
import * as Ai from 'react-icons/ai';
import * as Ti from 'react-icons/ti';
import * as Si from 'react-icons/si';
import * as Fa from 'react-icons/fa';

export type IconLibrary = Record<string, React.ComponentType<{ color?: string }>>;

export const iconLibraries: IconLibrary = {
  ...Ai,
  ...Ti,
  ...Si,
  ...Fa,
} as IconLibrary;

export function resolveIcon(name: string, color?: string): React.ReactElement {
  const IconComponent = iconLibraries[name];
  if (!IconComponent) {
    return <span aria-hidden='true' />;
  }
  return <IconComponent color={color} />;
}
