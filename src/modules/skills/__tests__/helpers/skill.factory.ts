import { faker } from '@faker-js/faker';

import { Skill } from '@/modules/skills/domain/entities/skill';

export function createSkill(overrides?: Partial<Skill>): Skill {
	return {
		description: faker.word.words(2),
		icon: 'SiReact',
		color: faker.color.rgb({ format: 'hex', prefix: '#' }),
		...overrides,
	};
}

export function createMany(count = 3, overrides?: Partial<Skill>): Skill[] {
	return Array.from({ length: count }, () => createSkill(overrides));
}
