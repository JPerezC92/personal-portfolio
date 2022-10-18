import { useInView } from 'framer-motion';
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
			animate={{ opacity: 0, y: 50 }}
			transition={{ duration: 2, type: 'spring' }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<SectionTitle>Sobre mí</SectionTitle>

			<Box
				css={{
					display: 'grid',
					maxWidth: '$max-w-3xl',
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
						Soy desarrollador orientado a front-end, autodidacta,
						apasionado por la programación y la tecnología,
						procedente de Ancash, <strong>Perú</strong>. Comencé
						estudiando programación por cuenta propia un par de
						meses después ingresé a estudiar en{' '}
						<strong>SENATI</strong> la carrera de desarrollo de
						software (2019-2021).
					</Text>

					<Text as="p" fontStyle="L1">
						Aunque mi meta es ser un desarrollador front-ent también
						he indagado un poco sobre el back-end.
					</Text>

					<Text as="p" fontStyle="L1">
						Actualmente, estoy reforzando mis conocimientos en{' '}
						<strong>CSS</strong> y aprendiendo a usar la biblioteca{' '}
						<strong>Stitches</strong>.
					</Text>
				</Box>
			</Box>
		</Section>
	);
};
