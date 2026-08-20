import { faker } from '@faker-js/faker';

import { Project, RawProject } from '@/modules/projects/domain/entities/project';

const projectTypes: Project['type'][] = ['fullstack', 'frontend', 'backend'];
const linkNames: Project['linkList'][number]['name'][] = [
	'web',
	'repositorio',
	'api',
];

export function createProject(overrides?: Partial<Project>): Project {
	return {
		type: faker.helpers.arrayElement(projectTypes),
		image: {
			url: faker.image.url(),
			width: faker.number.int({ min: 300, max: 1200 }),
			height: faker.number.int({ min: 300, max: 1200 }),
		},
		title: faker.word.words(3),
		description: faker.lorem.paragraph(),
		tecnologieList: [faker.word.noun(), faker.word.noun()],
		linkList: [
			{
				name: faker.helpers.arrayElement(linkNames),
				url: faker.internet.url(),
			},
		],
		...overrides,
	};
}

export function createRawProject(overrides?: Partial<RawProject>): RawProject {
	const project = createProject();

	return {
		type: project.type,
		image: project.image,
		title: project.title,
		tecnologieList: project.tecnologieList,
		linkList: project.linkList,
		...overrides,
	};
}

export function createMany(count = 3, overrides?: Partial<Project>): Project[] {
	return Array.from({ length: count }, () => createProject(overrides));
}
