import { socialLinksService } from '@/modules/social-links/services/social-links.service';
import { SocialLinksServiceError } from '@/modules/social-links/domain/errors/social-links-service.error';
import { SocialLink } from '@/modules/social-links/domain/entities/social-link';

export function useSocialList(): SocialLink[] {
  const data = socialLinksService.getAll();

  if (data instanceof SocialLinksServiceError) {
    return [];
  }

  return data;
}
