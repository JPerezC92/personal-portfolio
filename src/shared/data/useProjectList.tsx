import { useTranslations } from 'next-intl';

import { Project } from '@/projects/models/project.model';
import { Highlight } from '@/shared/components/Highlight/Highlight';

export function useProjectList(): Project[] {
	const t = useTranslations('Projects');

	return [
		{
			type: 'frontend',
			image: {
				url: '/projects/gentleman-programming-book.webp',
				width: 717,
				height: 538,
			},
			title: 'Gentleman Programming Book',
			description: (
				<>
					<p className='mb-4'>{t('gentlemanBook')}</p>
					<p>
						{t.rich('gentlemanBookCollab', {
							community: (chunks) => <Highlight>{chunks}</Highlight>,
						})}
					</p>
				</>
			),
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
			description: (
				<p>
					{t.rich('alkybank', {
						cleanArch: (chunks) => <Highlight>{chunks}</Highlight>,
						openApi: (chunks) => <Highlight>{chunks}</Highlight>,
					})}
				</p>
			),
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
			description: (
				<p>
					{t.rich('rickMorty', {
						community: (chunks) => <Highlight>{chunks}</Highlight>,
					})}
				</p>
			),
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
			description: (
				<p>
					{t.rich('aerolab', {
						company: (chunks) => <Highlight>{chunks}</Highlight>,
					})}
				</p>
			),
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
}
