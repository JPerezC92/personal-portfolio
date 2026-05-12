import { SkillIconKey } from '@/shared/utils/resolve-icon';

export interface Skill {
	description: string;
	icon: SkillIconKey;
	color: string;
	background?: string;
}
