import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MockProxy } from 'vitest-mock-extended';

import { createMany } from '@/modules/skills/__tests__/helpers/skill.factory';
import { SkillList } from '@/modules/skills/components/SkillList';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';
import { skillsService } from '@/modules/skills/services/skills.service';
import { renderWithQueryClient } from '@/shared/__tests__/helpers/renderWithQueryClient';

vi.mock('@/modules/skills/services/skills.service');

const mockedService: MockProxy<typeof skillsService> =
	skillsService as MockProxy<typeof skillsService>;

describe('SkillList', () => {
	it('renders a list item per skill from the service', async () => {
		const skills = createMany(3);
		mockedService.getAll.mockResolvedValue(skills);

		renderWithQueryClient(<SkillList />);

		for (const skill of skills) {
			expect(await screen.findByText(skill.description)).toBeInTheDocument();
		}
	});

	it('renders no list items when the service returns an error', async () => {
		mockedService.getAll.mockResolvedValue(new SkillsServiceError('Failed'));

		renderWithQueryClient(<SkillList />);

		await waitFor(() => expect(mockedService.getAll).toHaveBeenCalled());
		expect(screen.queryAllByRole('listitem')).toHaveLength(0);
	});
});
