import { skillsService } from '@/modules/skills/services/skills.service';
import { Skill } from '@/modules/skills/domain/entities/skill';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';

export function useSkillList(): Skill[] {
  const data = skillsService.getAll();

  if (data instanceof SkillsServiceError) {
    return [];
  }

  return data;
}
