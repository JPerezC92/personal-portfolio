import { SocialLink } from '@/modules/social-links/domain/entities/social-link';
import { SocialLinksServiceError } from '@/modules/social-links/domain/errors/social-links-service.error';

export const socialLinksService = {
  getAll: async (): Promise<SocialLink[] | SocialLinksServiceError> => {
    try {
      const res = await fetch('/api/social-links');

      if (!res.ok) {
        return new SocialLinksServiceError(
          `Request failed with status ${res.status}`,
        );
      }

      return (await res.json()) as SocialLink[];
    } catch (error) {
      return new SocialLinksServiceError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
};
