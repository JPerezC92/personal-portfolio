import { afterEach, describe, expect, it, vi } from 'vitest';

import { createSkill } from '@/modules/skills/__tests__/helpers/skill.factory';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';
import { skillsService } from '@/modules/skills/services/skills.service';

const mockFetch = vi.fn();

afterEach(() => {
	vi.unstubAllGlobals();
	vi.clearAllMocks();
});

describe('skillsService', () => {
	it('returns typed skills from the API response', async () => {
		const skill = createSkill();
		mockFetch.mockResolvedValue(
			new Response(JSON.stringify([skill]), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}),
		);
		vi.stubGlobal('fetch', mockFetch);

		const result = await skillsService.getAll();

		expect(mockFetch).toHaveBeenCalledWith('/api/skills');
		expect(result).toEqual([skill]);
	});

	it('returns a SkillsServiceError when the request rejects', async () => {
		mockFetch.mockRejectedValue(new Error('Network error'));
		vi.stubGlobal('fetch', mockFetch);

		const result = await skillsService.getAll();

		expect(result).toBeInstanceOf(SkillsServiceError);
	});

	it('returns a SkillsServiceError on a non-ok response', async () => {
		mockFetch.mockResolvedValue(new Response('Server error', { status: 500 }));
		vi.stubGlobal('fetch', mockFetch);

		const result = await skillsService.getAll();

		expect(result).toBeInstanceOf(SkillsServiceError);
	});
});
