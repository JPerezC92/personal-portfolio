import { useQuery } from '@tanstack/react-query';

import { SocialLink } from '@/modules/social-links/domain/entities/social-link';
import { SocialLinksServiceError } from '@/modules/social-links/domain/errors/social-links-service.error';
import { socialLinksService } from '@/modules/social-links/services/social-links.service';

import { socialLinkKeys } from './keys';

export function useSocialList(): SocialLink[] {
  const { data } = useQuery({
    queryKey: socialLinkKeys.all,
    queryFn: async () => {
      const r = await socialLinksService.getAll();
      if (r instanceof SocialLinksServiceError) throw r;
      return r;
    },
  });

  return data ?? [];
}
