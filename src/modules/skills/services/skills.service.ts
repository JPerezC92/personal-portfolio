import { Skill } from '@/modules/skills/domain/entities/skill';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';
import { skillList } from '@/shared/data/skills';

export const skillsService = {
  getAll: (): Skill[] | SkillsServiceError => {
    try {
      return skillList;
    } catch (error) {
      return new SkillsServiceError(
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  },
};
