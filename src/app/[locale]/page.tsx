'use client';

import { MotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ProjectCard } from '@/projects/components/ProjectCard/ProjectCard';
import { AppBar } from '@/shared/components/AppBar/AppBar';
import { Heading } from '@/shared/components/Heading/Heading';
import { Highlight } from '@/shared/components/Highlight/Highlight';
import { Icon } from '@/shared/components/Icon/Icon';
import { Motion } from '@/shared/components/Motion/Motion';
import { Text } from '@/shared/components/Text/Text';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { skillList } from '@/shared/data/skills';
import { socialList } from '@/shared/data/socialList';
import { useProjectList } from '@/shared/data/useProjectList';
import { cn } from '@/shared/utils/cn';
import { rgbDataURL } from '@/shared/utils/rgbDataURL';
import { sectionList } from '@/shared/utils/sections';
import { webRoutes } from '@/shared/utils/web.routes';

const Section = ({
	children,
	viewportMount = 0.2,
	...props
}: {
	children: React.ReactNode;
	viewportMount?: number;
} & React.ComponentProps<'section'> &
	MotionProps) => {
	return (
		<Motion
			{...props}
			component='section'
			className='pt-16 md:pt-28'
			animate={{ opacity: 0, y: 8 }}
			transition={{ duration: 2, type: 'spring' }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: viewportMount }}
		>
			{children}
		</Motion>
	);
};

export default function Home() {
	const t = useTranslations();
	const projectList = useProjectList();

	return (
		<>
			<AppBar
				sections={[
					{
						title: t('Nav.aboutMe'),
						link: webRoutes.homeSection(sectionList.values.sobre_mi),
					},
					{
						title: t('Nav.skills'),
						link: webRoutes.homeSection(sectionList.values.conocimientos),
					},
					{
						title: t('Nav.projects'),
						link: webRoutes.homeSection(sectionList.values.proyectos),
					},
				]}
				className='fixed inset-0 h-max z-10 backdrop-blur-2xl'
			/>

			<main className='flex flex-col flex-1 px-4 xl:px-0 max-w-screen-xl mx-auto'>
				<section
					id='hero'
					className='h-[100vh] max-h-[45rem] sm:max-h-[48rem] lg:max-h-[50rem] 2xl:max-h-[68rem] mx-auto flex flex-col justify-center'
				>
					<Motion
						component='picture'
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 2, type: 'spring' }}
					>
						<Image
							priority
							className='w-auto h-auto max-w-[280px] sm:max-w-xs md:max-w-md mx-auto'
							src='/dev_programming.webp'
							alt='dev programming'
							placeholder='blur'
							blurDataURL={rgbDataURL(35, 30, 64)}
							width={737}
							height={536}
						/>
					</Motion>

					<Motion
						component='div'
						className='mt-4 md:mt-8 max-w-3xl'
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 2, type: 'spring' }}
					>
						<Heading component='h1' fontSize='md' className='mb-4 md:mb-8'>
							<Text className='normal-case'>{t('Hero.greeting')}</Text>
							<Heading component='div' fontSize='5xl' className='my-2'>
								{t('Hero.name')}
							</Heading>{' '}
							<Text className='normal-case'>
								{t.rich('Hero.headline', {
									juniorDev: (chunks) => <Highlight>{chunks}</Highlight>,
									typescript: (chunks) => <Highlight>{chunks}</Highlight>,
								})}
							</Text>
						</Heading>

						<div className='flex gap-2'>
							<Button asChild size='md'>
								<a
									href='/curriculum.pdf'
									title='Curriculum'
									download='Philip Perez Castro Curriculum'
									target='_blank'
								>
									{t('Hero.cv')}
								</a>
							</Button>

							{socialList?.map(({ link, icon: SocialIcon, title }) => (
								<Button
									key={title}
									asChild
									colorScheme='secondary'
									variant='outline'
									size='icon'
								>
									<Link href={link}>
										<SocialIcon />
									</Link>
								</Button>
							))}
						</div>
					</Motion>
				</section>

				<Section id={sectionList.values.sobre_mi}>
					<Heading component='h2' fontSize='3xl'>
						{t('About.title')}
					</Heading>

					<Separator className='mt-4 mb-16' />

					<div className='flex gap-y-8 flex-col md:flex-row justify-center gap-x-8'>
						<div
							className={cn(
								'bg-sepia-base rounded-md p-4 mx-auto max-w-[250px]',
								'md:max-w-[280px] md:mx-0',
							)}
						>
							<Image
								src='/personal-photo.webp'
								className='bg-sepia-base rounded-md'
								alt='Philip Perez Castro'
								width={600}
								height={800}
							/>
						</div>

						<Text component='div' className='max-w-md self-center space-y-4'>
							<Text>
								{t.rich('About.bio1', {
									location: (chunks) => <Highlight>{chunks}</Highlight>,
									school: (chunks) => <Highlight>{chunks}</Highlight>,
									years: () => (
										<span className='whitespace-nowrap'>(2019-2021)</span>
									),
								})}
							</Text>

							<Text>{t('About.bio2')}</Text>
						</Text>
					</div>
				</Section>

				<Section id={sectionList.values.conocimientos}>
					<Heading component='h2' fontSize='3xl'>
						{t('Skills.title')}
					</Heading>

					<Separator className='mt-4 mb-16' />

					<ul
						className={cn(
							'flex flex-wrap justify-evenly gap-x-12 gap-y-8 items-center transition-all duration-300',
							'md:gap-x-24',
							'xl:gap-x-10 xl:justify-between',
						)}
					>
						{skillList.map(({ description, icon: Ico, color }) => (
							<li
								key={description}
								className='flex flex-col justify-center items-center'
							>
								<Icon
									title={description}
									size='2xl'
									icon={<Ico color={color} />}
								/>
								<Text component='span'>{description}</Text>
							</li>
						))}
					</ul>
				</Section>

				<Section id={sectionList.values.proyectos} viewportMount={0.1}>
					<Heading component='h2' fontSize='3xl'>
						{t('Projects.title')}
					</Heading>
					<Separator className='mt-4 mb-16' />
					<ul className='flex flex-col gap-8'>
						{projectList.map((p) => (
							<li key={p.title} className='contents'>
								<ProjectCard project={p} />
							</li>
						))}
					</ul>
				</Section>
			</main>

			<Image
				priority
				src='/cat.svg'
				alt='cat throwing things'
				width={450}
				height={450}
				placeholder='blur'
				blurDataURL={rgbDataURL(38, 50, 56)}
				className='mx-auto mt-20'
			/>

			<footer className='bg-primary-700/20 border-primary-400/50 border-y py-4'>
				<ul className='flex gap-x-4 justify-center'>
					{socialList?.map(({ link, icon: SocialIcon, title }) => (
						<li key={title} className='contents'>
							<Button
								asChild
								colorScheme='secondary'
								variant='outline'
								size='icon'
							>
								<Link href={link}>
									<SocialIcon />
								</Link>
							</Button>
						</li>
					))}
				</ul>
			</footer>
		</>
	);
}
