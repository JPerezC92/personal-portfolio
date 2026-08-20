import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MockProxy } from 'vitest-mock-extended';

import { createMany } from '@/modules/projects/__tests__/helpers/project.factory';
import { ProjectList } from '@/modules/projects/components/ProjectList';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';
import { projectsService } from '@/modules/projects/services/projects.service';
import { renderWithQueryClient } from '@/shared/__tests__/helpers/renderWithQueryClient';

vi.mock('@/modules/projects/services/projects.service');

const mockedService: MockProxy<typeof projectsService> =
	projectsService as MockProxy<typeof projectsService>;

describe('ProjectList', () => {
	it('renders a card per project from the service', async () => {
		const projects = createMany(2);
		mockedService.getAll.mockResolvedValue(projects);

		renderWithQueryClient(<ProjectList />);

		expect(await screen.findByText(projects[0].title)).toBeInTheDocument();
		expect(await screen.findByText(projects[1].title)).toBeInTheDocument();
	});

	it('renders nothing when the service returns an error', async () => {
		mockedService.getAll.mockResolvedValue(new ProjectsServiceError('Failed'));

		renderWithQueryClient(<ProjectList />);

		await waitFor(() => {
			expect(screen.queryByRole('list')).not.toBeInTheDocument();
		});
	});
});
