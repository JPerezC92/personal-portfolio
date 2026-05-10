import { RawProject } from '@/modules/projects/domain/entities/project';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';

const rawProjectList: RawProject[] = [
	{
		type: 'frontend',
		image: {
			url: '/projects/gentleman-programming-book.webp',
			width: 717,
			height: 538,
		},
		title: 'Gentleman Programming Book',
		linkList: [
			{
				name: 'web',
				url: 'https://gentleman-programming-book.vercel.app/',
			},
			{
				name: 'repositorio',
				url: 'https://github.com/Gentleman-Programming/gentleman-programming-book',
			},
		],
		tecnologieList: ['Vanilla extract', 'MDX', 'NextJS', 'Rehype'],
	},
	{
		type: 'fullstack',
		image: {
			url: '/projects/alkybank.webp',
			width: 717,
			height: 538,
		},
		title: 'Alkybank',
		linkList: [
			{
				name: 'web',
				url: 'https://alkybank-rho.vercel.app/',
			},
			{
				name: 'repositorio',
				url: 'https://github.com/JPerezC92/AlkyBank',
			},
			{
				name: 'api',
				url: 'https://virtual-wallet-api.vercel.app/swagger',
			},
			{
				name: 'repositorio',
				url: 'https://github.com/JPerezC92/virtual-wallet-api',
			},
		],
		tecnologieList: [
			'NextJS',
			'React Query',
			'NestJS',
			'Zod',
			'Passport',
			'Prisma',
		],
	},
	{
		type: 'frontend',
		image: {
			url: '/projects/rick-morty-challenge.webp',
			width: 717,
			height: 538,
		},
		title: 'Rick & Morty challenge',
		linkList: [
			{
				name: 'web',
				url: 'https://rick-morty-app-jet.vercel.app',
			},
			{
				name: 'repositorio',
				url: 'https://github.com/JPerezC92/challenge-rick-morty',
			},
		],
		tecnologieList: ['Nextjs', 'Tailwind', 'Typescript', 'React query'],
	},
	{
		type: 'frontend',
		image: {
			url: '/projects/aerolab-frontend-challenge.webp',
			width: 717,
			height: 538,
		},
		title: 'Aerolab frontend challenge',
		linkList: [
			{
				name: 'web',
				url: 'https://aerolab-frontend-challenge-beta.vercel.app/',
			},
			{
				name: 'repositorio',
				url: 'https://github.com/JPerezC92/challenge-frontend-aerolab',
			},
		],
		tecnologieList: ['React', 'Nextjs', 'Typescript'],
	},
];

export const projectsService = {
	getAll: (): RawProject[] | ProjectsServiceError => {
		try {
			return rawProjectList;
		} catch (error) {
			return new ProjectsServiceError(
				error instanceof Error ? error.message : 'Unknown error',
			);
		}
	},
};
