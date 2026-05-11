import { SocialLink } from '@/modules/social-links/domain/entities/social-link';
import { SocialLinksServiceError } from '@/modules/social-links/domain/errors/social-links-service.error';
import { socialList } from '@/shared/data/socialList';

export const socialLinksService = {
  getAll: (): SocialLink[] | SocialLinksServiceError => {
    try {
      return socialList.map((item) => ({
        link: item.link,
        icon: item.icon,
        title: item.title,
      }));
    } catch (error) {
      return new SocialLinksServiceError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
};
