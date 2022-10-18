import Link from 'next/link';
import React from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { DiGit } from 'react-icons/di';
import { SectionTitle } from 'src/landing/components/SectionTitle';
import { projectList } from 'src/landing/utils/projectList';
import { Box } from 'src/shared/components/Box';
import { Button } from 'src/shared/components/Button';
import { Heading } from 'src/shared/components/Heading';
import { Icon } from 'src/shared/components/Icon';
import { Image } from 'src/shared/components/Image';
import { Section } from 'src/shared/components/Section';
import { SectionProps } from 'src/shared/components/Section/Section';
import { Text } from 'src/shared/components/Text';
import { rgbDataURL } from 'src/shared/utils/rgbDataURL';

type ProjectsProps = SectionProps;

export const Projects: React.FC<ProjectsProps> = (props) => {
	return (
		<Section
			{...props}
			animate={{ opacity: 0, y: 50 }}
			transition={{ duration: 2, type: 'spring' }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.1 }}
		>
			<SectionTitle>Proyectos</SectionTitle>

			<Box
				as="ul"
				css={{
					[`& > li + li`]: {
						marginBlockStart: '$space04',
					},
				}}
			>
				{projectList.map((v) => (
					<Box as="li" key={v.title}>
						<Box
							as="article"
							css={{
								marginInline: 'auto',
								maxWidth: '$max-w-sm',
								padding: '$space04',
								backgroundColor: '$primary100_a10',
								borderRadius: '.5rem',
								border: '1px solid $colors$primary400_a30',
								gap: '$space08',
								display: 'grid',
								'@md': {
									minWidth: '100%',
									display: 'grid',
									gridTemplateColumns: '.7fr 1fr',
								},
							}}
						>
							<Box
								as="picture"
								css={{
									width: '100%',
									height: '100%',
									maxHeight: '25rem',
									overflow: 'hidden',
									display: 'block',
									borderRadius: '.2rem',
								}}
							>
								<Image
									priority
									css={{ width: 'auto', height: 'auto' }}
									src={v.image.url}
									width={v.image.width}
									height={v.image.height}
									alt={v.title}
									placeholder="blur"
									blurDataURL={rgbDataURL(69, 221, 198)}
								/>
							</Box>

							<Box
								css={{
									display: 'flex',
									flexDirection: 'column',
									rowGap: '$space04',
								}}
							>
								<Heading
									as="h3"
									fontStyle="L4"
									css={{ textAlign: 'center' }}
								>
									{v.title}
								</Heading>

								<Text as="p" fontStyle="L1">
									{v.description}
								</Text>

								<Box>
									<Text
										as="h4"
										fontStyle="L1"
										textStyle="allCaps"
									>
										Tecnologias
									</Text>

									<Box
										as="ul"
										css={{
											display: 'flex',
											flexWrap: 'wrap',
											gap: '$space04',
											marginBlockStart: '$space02',
										}}
									>
										{v.tecnologieList.map((v, i) => (
											<Box
												key={i}
												as="li"
												css={{ display: 'block' }}
											>
												<Icon
													asIcon={v.icon}
													title={v.name}
													size="sm"
													css={{
														color: '$special2_400',
													}}
												/>
											</Box>
										))}
									</Box>
								</Box>

								<Box
									css={{
										display: 'flex',
										flexDirection: 'column',
										gap: '$space02',
										'@md': {
											display: 'grid',
											marginBlockStart: 'auto',
											gridTemplateColumns:
												'repeat(2, 1fr)',
										},
									}}
								>
									<Link href={v?.site} passHref>
										<Button
											as="a"
											colorScheme="primary"
											target="_blank"
											title="Demo"
											css={{
												display: v.site
													? 'flex'
													: 'none',
											}}
										>
											<Icon
												asIcon={BiLinkExternal}
												size="md"
											/>{' '}
											Demo
										</Button>
									</Link>

									<Link href={v?.repository} passHref>
										<Button
											as="a"
											colorScheme="secondary"
											title="Repositorio"
											target="_blank"
										>
											<Icon asIcon={DiGit} size="md" />{' '}
											Repositorio
										</Button>
									</Link>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Box>
		</Section>
	);
};
