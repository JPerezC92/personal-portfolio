import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MockProxy } from 'vitest-mock-extended';

import {
	createMany,
	createSocialLink,
} from '@/modules/social-links/__tests__/helpers/social-link.factory';
import { SocialList } from '@/modules/social-links/components/SocialList';
import { socialLinksService } from '@/modules/social-links/services/social-links.service';
import { renderWithQueryClient } from '@/shared/__tests__/helpers/renderWithQueryClient';

vi.mock('@/modules/social-links/services/social-links.service');

const mockedService: MockProxy<typeof socialLinksService> =
	socialLinksService as MockProxy<typeof socialLinksService>;

afterEach(() => {
	vi.restoreAllMocks();
});

describe('SocialList', () => {
	it('renders an aria-labelled link per social entry', async () => {
		const links = createMany(3);
		mockedService.getAll.mockResolvedValue(links);

		renderWithQueryClient(<SocialList />);

		const renderedLinks = await screen.findAllByRole('link');
		expect(renderedLinks).toHaveLength(3);

		for (const link of links) {
			expect(
				screen.getByRole('link', { name: link.title }),
			).toBeInTheDocument();
		}
	});

	it('renders nothing for entries with an unknown icon', async () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		const links = [
			createSocialLink(),
			createSocialLink({ icon: 'UnknownIcon' }),
			createSocialLink(),
		];
		mockedService.getAll.mockResolvedValue(links);

		renderWithQueryClient(<SocialList />);

		expect(await screen.findAllByRole('link')).toHaveLength(2);
	});
});
