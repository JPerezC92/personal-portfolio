import { afterEach, describe, expect, it, vi } from 'vitest';

import { createRawProject } from '@/modules/projects/__tests__/helpers/project.factory';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';
import { projectsService } from '@/modules/projects/services/projects.service';

const mockFetch = vi.fn();

afterEach(() => {
	vi.unstubAllGlobals();
	vi.clearAllMocks();
});

describe('projectsService', () => {
	it('returns typed projects from the API response', async () => {
		const rawProject = createRawProject();
		mockFetch.mockResolvedValue(
			new Response(JSON.stringify([rawProject]), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}),
		);
		vi.stubGlobal('fetch', mockFetch);

		const result = await projectsService.getAll();

		expect(mockFetch).toHaveBeenCalledWith('/api/projects');
		expect(result).toEqual([rawProject]);
	});

	it('returns a ProjectsServiceError when the request rejects', async () => {
		mockFetch.mockRejectedValue(new Error('Network error'));
		vi.stubGlobal('fetch', mockFetch);

		const result = await projectsService.getAll();

		expect(result).toBeInstanceOf(ProjectsServiceError);
	});

	it('returns a ProjectsServiceError on a non-ok response', async () => {
		mockFetch.mockResolvedValue(new Response('Server error', { status: 500 }));
		vi.stubGlobal('fetch', mockFetch);

		const result = await projectsService.getAll();

		expect(result).toBeInstanceOf(ProjectsServiceError);
	});
});
