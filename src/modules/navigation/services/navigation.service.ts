import { sectionList } from '@/modules/navigation/domain/entities/section';
import { NavigationServiceError } from '@/modules/navigation/domain/errors/navigation-service.error';
import { EnvironmentVariable } from '@/shared/utils/envVariables';

const home = EnvironmentVariable.WEB_URL;

export const navigationService = {
  getSections: (): typeof sectionList | NavigationServiceError => {
    try {
      return sectionList;
    } catch (error) {
      return new NavigationServiceError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },

  homeSection: (sectionKey: string): string | NavigationServiceError => {
    if (!home) {
      return new NavigationServiceError('WEB_URL environment variable is not defined');
    }
    return `${home}#${sectionKey}`;
  },
};
