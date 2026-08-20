import { faker } from '@faker-js/faker';

import { NavSection } from '@/modules/navigation/domain/entities/nav-section';

export function createNavSection(
	overrides?: Partial<NavSection>,
): NavSection {
	return {
		title: faker.word.words(2),
		link: faker.internet.url(),
		...overrides,
	};
}

export function createMany(
	count = 3,
	overrides?: Partial<NavSection>,
): NavSection[] {
	return Array.from({ length: count }, () => createNavSection(overrides));
}
