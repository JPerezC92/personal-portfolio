import { Project } from '@/projects/models';
import { Highlight } from '@/shared/components';

export const projectList: Project[] = [
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
				<p className='mb-4'>
					Esta aplicación es un libro online que aborda el desarrollo de
					software y las prácticas de código limpio desde la perspectiva de un
					desarrollador frontend. Escrito en un lenguaje claro y accesible, es
					apto para cualquier persona interesada en aprender programación.
				</p>

				<p>
					Creado en colaboración con la comunidad de{' '}
					<Highlight>Gentleman Programming</Highlight>.
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
				Esta aplicación simula una billetera virtual, facilitando transacciones
				y operaciones entre usuarios. Incluye funciones de gestión de dinero,
				seguimiento de ingresos y egresos, y simulación de transferencias.
				Implementada con <Highlight>arquitecturas limpias</Highlight> (DDD),
				manejo de errores en la capa de Aplicación (Casos de uso), validación de
				datos y documentación mediante <Highlight>Open API</Highlight>{' '}
				(Swagger).
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
				Esta aplicación fue creada para el desafío de la comunindad{' '}
				<Highlight>Gentleman Programming</Highlight>, brindando información
				detallada sobre los personajes de la famosa serie de TV &quot;Rick &
				Morty&quot;. Explora su participación en episodios, busca personajes,
				descubre temporadas y disfruta de un emocionante minijuego. Sumérgete en
				el fascinante mundo de Rick y Morty a través de esta aplicación.
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
				Esta aplicación presenta un catálogo de artículos disponibles para el
				programa de fidelización, donde los usuarios pueden canjear sus puntos
				por productos tecnológicos. El desafío consiste en construir una vista
				de catálogo utilizando una API proporcionada por{' '}
				<Highlight>Aerolab</Highlight> y un diseño proporcionado por la misma
				entidad.
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
	// {
	// 	image: {
	// 		url: '/projects/challenge-alkemy.webp',
	// 		width: '720',
	// 		height: '1280',
	// 	},
	// 	title: 'Alkemy Challenge',
	// 	description:
	// 		'Reto propuesto por Alkemy, esta aplicación sirve para administrar nuestro presupuesto personal, permite crear y editar ingresos y egresos de dinero, y mostrar un balance resultante de las operaciones registradas.',
	// 	site: '',
	// 	repository:
	// 		'https://github.com/JPerezC92/challenge-full-stack-alkemy-frontend',
	// 	tecnologieList: [
	// 		{ name: 'React', icon: SiReact },
	// 		{ name: 'Nextjs', icon: SiNextdotjs },
	// 		{ name: 'Tailwind', icon: SiTailwindcss },
	// 		{ name: 'Typescript', icon: SiTypescript },
	// 	],
	// },
];
