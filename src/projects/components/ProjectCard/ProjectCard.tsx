import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { RiGlobalFill } from 'react-icons/ri';
import { TbApi } from 'react-icons/tb';

import { Project } from '@/projects/models';
import { Heading, Hr, IconButton, Text } from '@/shared/components';
import { rgbDataURL } from '@/shared/utils';

type ProjectCardProps = {
	project: Project;
} & React.ComponentProps<'div'>;

export const ProjectCard: React.FC<ProjectCardProps> = ({
	project,
	...props
}) => {
	return (
		<div
			className={clsx([
				'relative bg-primary-400/10 grid grid-rows-[auto_1fr] border border-primary-400/50 rounded-xl overflow-hidden shadow-[0_0_9px_2px] shadow-primary-500/30',
				'[&:hover_>_picture::after]:bg-transparent',
				'md:grid md:grid-cols-[0.46fr_0.54fr] md:[&:hover_>_p]:top-0',
			])}
			{...props}
		>
			<Text className='absolute top-0 md:-top-8 right-0 z-[2] bg-accent-800 px-4 capitalize rounded-bl-md border-b border-l border-secondary-400 transition-all duration-300'>
				{project.type}
			</Text>

			<picture
				className={clsx([
					'border-b border-primary-400/50 relative',
					'after:bg-primary-900/50 after:absolute after:inset-0 after:transition-all after:duration-300',
					'md:border-b-0 md:border-r md:border-primary-400/50',
				])}
			>
				<Image
					priority
					src={project.image.url}
					alt={project.title}
					width={project.image.width}
					height={project.image.height}
					placeholder='blur'
					blurDataURL={rgbDataURL(24, 58, 63)}
					className={clsx([
						'aspect-[16/12] object-cover object-center w-full h-full lg:max-h-none transition-all duration-300',
					])}
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

				<Hr className='mb-8 mt-4 -mx-4' />

				<ul className='mb-4 flex gap-x-2'>
					{project.linkList.map(({ name, url }) =>
						name === 'web' ? (
							<IconButton
								key={url}
								title={name}
								component='a'
								variant='ghost'
								colorScheme='secondary'
								className='rounded-full bg-secondary-500/10'
								icon={<RiGlobalFill />}
								href={url}
								target='_blank'
							/>
						) : name === 'repositorio' ? (
							<IconButton
								key={url}
								title={name}
								component='a'
								variant='ghost'
								colorScheme='secondary'
								className='rounded-full bg-secondary-500/10'
								icon={<FaGithub />}
								href={url}
								target='_blank'
							/>
						) : name === 'api' ? (
							<IconButton
								key={url}
								title={name}
								component='a'
								variant='ghost'
								colorScheme='secondary'
								className='rounded-full bg-secondary-500/10'
								icon={<TbApi />}
								href={url}
								target='_blank'
							/>
						) : null,
					)}
				</ul>

				<Text
					component='div'
					className={clsx([
						'mb-8',
						'sm:mb-0',
						'md:h-0 md:opacity-0',
						'lg:mb-8 lg:h-auto lg:opacity-100',
					])}
				>
					{project.description}
				</Text>

				<div>
					<Heading component='h4' fontSize='lg' className='mb-4'>
						Tecnologías
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
