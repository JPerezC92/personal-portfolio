import { useQuery } from '@tanstack/react-query';

import { Skill } from '@/modules/skills/domain/entities/skill';
import { SkillsServiceError } from '@/modules/skills/domain/errors/skills-service.error';
import { skillsService } from '@/modules/skills/services/skills.service';

import { skillKeys } from './keys';

export function useSkillList(): Skill[] {
  const { data } = useQuery({
    queryKey: skillKeys.all,
    queryFn: async () => {
      const r = await skillsService.getAll();
      if (r instanceof SkillsServiceError) throw r;
      return r;
    },
  });

  return data ?? [];
}
