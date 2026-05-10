import { useTranslations } from 'next-intl';

import { NavSection } from '@/modules/navigation/domain/entities/nav-section';
import { NavigationHookResult } from '@/modules/navigation/domain/entities/navigation-hook-result';
import { NavigationServiceError } from '@/modules/navigation/domain/errors/navigation-service.error';
import { navigationService } from '@/modules/navigation/services/navigation.service';

export function useNavigation(): NavigationHookResult {
  const t = useTranslations('Nav');

  const sectionsResult = navigationService.getSections();

  if (sectionsResult instanceof NavigationServiceError) {
    throw sectionsResult;
  }

  const { values } = sectionsResult;

  const aboutMeLink = navigationService.homeSection(values.sobre_mi);
  if (aboutMeLink instanceof NavigationServiceError) throw aboutMeLink;

  const skillsLink = navigationService.homeSection(values.conocimientos);
  if (skillsLink instanceof NavigationServiceError) throw skillsLink;

  const projectsLink = navigationService.homeSection(values.proyectos);
  if (projectsLink instanceof NavigationServiceError) throw projectsLink;

  const sections: NavSection[] = [
    { title: t('aboutMe'), link: aboutMeLink },
    { title: t('skills'), link: skillsLink },
    { title: t('projects'), link: projectsLink },
  ];

  return {
    sections,
    homeSection: (section: string) => {
      const result = navigationService.homeSection(section);
      if (result instanceof NavigationServiceError) throw result;
      return result;
    },
  };
}
