import { NavSection } from './nav-section';

export type NavigationHookResult = {
  sections: NavSection[];
  homeSection: (section: string) => string;
};
