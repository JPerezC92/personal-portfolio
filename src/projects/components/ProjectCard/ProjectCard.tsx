import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { RiGlobalFill } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

import { Project } from '@/projects/models/project.model';
import { Heading } from '@/shared/components/Heading/Heading';
import { Text } from '@/shared/components/Text/Text';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import { cn } from '@/shared/utils/cn';
import { rgbDataURL } from '@/shared/utils/rgbDataURL';

type ProjectCardProps = {
	project: Project;
} & React.ComponentProps<'div'>;

const linkIcons = {
	web: RiGlobalFill,
	repositorio: FaGithub,
	api: TbApi,
} as const;

export const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	...props
}) => {
	const t = useTranslations('Projects');
	return (
		<div
			className={cn(
				'relative bg-primary-400/10 grid grid-rows-[auto_1fr] border border-primary-400/50 rounded-xl overflow-hidden shadow-[0_0_9px_2px] shadow-primary-500/30',
				'[&:hover_>_picture::after]:bg-transparent',
				'md:grid md:grid-cols-[0.46fr_0.54fr] md:[&:hover_>_p]:top-0',
			)}
			{...props}
		>
			<Text className='absolute top-0 md:-top-8 right-0 z-[2] bg-accent-800 px-4 capitalize rounded-bl-md border-b border-l border-secondary-400 transition-all duration-300'>
				{project.type}
			</Text>

			<picture
				className={cn(
					'border-b border-primary-400/50 relative',
					'after:bg-primary-900/50 after:absolute after:inset-0 after:transition-all after:duration-300',
					'md:border-b-0 md:border-r md:border-primary-400/50',
				)}
			>
				<Image
					priority
					src={project.image.url}
					alt={project.title}
					width={project.image.width}
					height={project.image.height}
					placeholder='blur'
					blurDataURL={rgbDataURL(24, 58, 63)}
					className='aspect-[16/12] object-cover object-center w-full h-full lg:max-h-none transition-all duration-300'
				/>
			</picture>

			<div className='p-4'>
				<Heading
					component='h3'
					fontSize='xl'
					className='text-center md:text-left'
				>
					{project.title}
				</Heading>

				<Separator className='mb-8 mt-4 -mx-4' />

				<ul className='mb-4 flex gap-x-2'>
					{project.linkList.map(({ name, url }) => {
						const Icon = linkIcons[name];
						if (!Icon) return null;
						return (
							<li key={url}>
								<Button
									asChild
									variant='ghost'
									size='icon'
									colorScheme='secondary'
									className='rounded-full bg-secondary-500/10'
								>
									<Link href={url} target='_blank' title={name}>
										<Icon />
									</Link>
								</Button>
							</li>
						);
					})}
				</ul>

				<Text
					component='div'
					className={cn(
						'mb-8',
						'sm:mb-0',
						'md:h-0 md:opacity-0',
						'lg:mb-8 lg:h-auto lg:opacity-100',
					)}
				>
					{project.description}
				</Text>

				<div>
					<Heading component='h4' fontSize='lg' className='mb-4'>
						{t('technologies')}
					</Heading>

					<div className='flex flex-wrap gap-2'>
						{project.tecnologieList.map(technology => (
							<Text
								component='span'
								fontSize='xs'
								key={technology}
								className='bg-accent-400/50 px-2 py-[0.125rem] rounded-md'
							>
								{technology}
							</Text>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
