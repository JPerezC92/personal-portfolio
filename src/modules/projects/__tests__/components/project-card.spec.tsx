import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { createProject } from '@/modules/projects/__tests__/helpers/project.factory';
import { ProjectCard } from '@/modules/projects/components/ProjectCard';
import { Project } from '@/modules/projects/domain/entities/project';
import { renderWithQueryClient } from '@/shared/__tests__/helpers/renderWithQueryClient';

describe('ProjectCard', () => {
	it('renders title, type badge, technologies and link buttons', () => {
		const project = createProject();

		renderWithQueryClient(<ProjectCard project={project} />);

		expect(
			screen.getByRole('heading', { level: 3, name: project.title }),
		).toBeInTheDocument();
		expect(screen.getByText(project.type)).toBeInTheDocument();

		for (const technology of project.tecnologieList) {
			expect(screen.getByText(technology)).toBeInTheDocument();
		}

		for (const link of project.linkList) {
			expect(screen.getByRole('link', { name: link.name })).toHaveAttribute(
				'href',
				link.url,
			);
		}
	});

	it('renders no link button for unknown link names', () => {
		const project = createProject({
			linkList: [
				{ name: 'web', url: faker.internet.url() },
				{ name: 'unknown', url: faker.internet.url() },
			] as Project['linkList'],
		});

		renderWithQueryClient(<ProjectCard project={project} />);

		expect(screen.getAllByRole('link')).toHaveLength(1);
		expect(screen.getByRole('link', { name: 'web' })).toBeInTheDocument();
	});
});
