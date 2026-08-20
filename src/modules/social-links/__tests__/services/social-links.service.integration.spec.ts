import { afterEach, describe, expect, it, vi } from 'vitest';

import { createSocialLink } from '@/modules/social-links/__tests__/helpers/social-link.factory';
import { SocialLinksServiceError } from '@/modules/social-links/domain/errors/social-links-service.error';
import { socialLinksService } from '@/modules/social-links/services/social-links.service';

const mockFetch = vi.fn();

afterEach(() => {
	vi.unstubAllGlobals();
	vi.clearAllMocks();
});

describe('socialLinksService', () => {
	it('returns typed social links from the API response', async () => {
		const socialLink = createSocialLink();
		mockFetch.mockResolvedValue(
			new Response(JSON.stringify([socialLink]), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}),
		);
		vi.stubGlobal('fetch', mockFetch);

		const result = await socialLinksService.getAll();

		expect(mockFetch).toHaveBeenCalledWith('/api/social-links');
		expect(result).toEqual([socialLink]);
	});

	it('returns a SocialLinksServiceError when the request rejects', async () => {
		mockFetch.mockRejectedValue(new Error('Network error'));
		vi.stubGlobal('fetch', mockFetch);

		const result = await socialLinksService.getAll();

		expect(result).toBeInstanceOf(SocialLinksServiceError);
	});

	it('returns a SocialLinksServiceError on a non-ok response', async () => {
		mockFetch.mockResolvedValue(new Response('Server error', { status: 500 }));
		vi.stubGlobal('fetch', mockFetch);

		const result = await socialLinksService.getAll();

		expect(result).toBeInstanceOf(SocialLinksServiceError);
	});
});
