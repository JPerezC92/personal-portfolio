import { Skill } from '@/modules/skills/domain/entities/skill';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';

export const skillsService = {
  getAll: async (): Promise<Skill[] | SkillsServiceError> => {
    try {
      const res = await fetch('/api/skills');

      if (!res.ok) {
        return new SkillsServiceError(`Request failed with status ${res.status}`);
      }

      return (await res.json()) as Skill[];
    } catch (error) {
      return new SkillsServiceError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
};
