import React from 'react';
import { SectionTitle } from 'src/landing/components/SectionTitle';
import { Box } from 'src/shared/components/Box';
import { Image } from 'src/shared/components/Image';
import { Section } from 'src/shared/components/Section';
import { SectionProps } from 'src/shared/components/Section/Section';
import { Text } from 'src/shared/components/Text';
import { rgbDataURL } from 'src/shared/utils/rgbDataURL';

type AboutMeProps = SectionProps;

export const AboutMe: React.FC<AboutMeProps> = (props) => {
	return (
		<Section
			{...props}
			animate={{ opacity: 0, y: 10 }}
			transition={{ duration: 2, type: 'spring' }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<SectionTitle>Sobre mí</SectionTitle>

			<Box
				css={{
					display: 'grid',
					maxWidth: '$max-w-4xl',
					width: '100%',
					'@md': {
						marginInline: 'auto',
						gridTemplateColumns: 'auto 1fr',
						gap: '$space08',
					},
				}}
			>
				<Box
					as="picture"
					css={{
						display: 'block',
						marginInline: 'auto',
						padding: '$space04',
						marginBlockEnd: '$space04',
						backgroundColor: '$special1_100',
						borderRadius: '.5rem',
						maxWidth: '$max-w-xs',
						'@md': { marginBlockEnd: '$space00' },
					}}
				>
					<Image
						priority
						src="/personal-photo.webp"
						alt="philip photography"
						width={1176}
						height={1568}
						placeholder="blur"
						blurDataURL={rgbDataURL(241, 228, 191)}
						css={{
							width: 'auto',
							height: 'auto',
							verticalAlign: 'middle',
						}}
					/>
				</Box>

				<Box
					css={{
						'& p + p': { marginBlockStart: '$space08' },
						'@md': { marginBlock: 'auto' },
					}}
				>
					<Text as="p" fontStyle="L1">
						Soy un desarrollador autodidacta con una gran pasión por la
						programación y la tecnología. Originario de Ancash,{' '}
						<strong>Perú</strong>, comencé mi carrera de aprendizaje de
						programación de manera autónoma y luego continué mis estudios en la
						carrera de Desarrollo de Software en <strong>SENATI</strong>{' '}
						(2019-2021). Me gusta trabajar en diferentes proyectos y tengo
						experiencia en desarrollo frontend y backend. Mi objetivo principal
						es seguir aprendiendo y creciendo como desarrollador para poder
						aportar soluciones innovadoras y de alta calidad a los proyectos en
						los que participe.
					</Text>

					<Text as="p" fontStyle="L1">
						Actualmente, estoy reforzando mis conocimientos en{' '}
						<strong>CSS</strong> y aprendiendo a usar la biblioteca{' '}
						<strong>MDX</strong>.
					</Text>
				</Box>
			</Box>
		</Section>
	);
};
