import { faker } from '@faker-js/faker';

import { SocialLink } from '@/modules/social-links/domain/entities/social-link';

const socialIcons = ['Code', 'Briefcase', 'Mail'];

export function createSocialLink(overrides?: Partial<SocialLink>): SocialLink {
	return {
		link: faker.internet.url(),
		icon: faker.helpers.arrayElement(socialIcons),
		title: faker.word.noun(),
		...overrides,
	};
}

export function createMany(
	count = 3,
	overrides?: Partial<SocialLink>,
): SocialLink[] {
	return Array.from({ length: count }, () => createSocialLink(overrides));
}
