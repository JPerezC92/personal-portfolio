import Link from 'next/link';
import React from 'react';
import { socialList } from 'src/landing/utils/socialList';
import { Box } from 'src/shared/components/Box';
import { Button } from 'src/shared/components/Button';
import { Heading } from 'src/shared/components/Heading';
import { IconButton } from 'src/shared/components/IconButton';
import { Image } from 'src/shared/components/Image';
import { Motion } from 'src/shared/components/Motion';
import { Section } from 'src/shared/components/Section';
import { SectionProps } from 'src/shared/components/Section/Section';
import { Text } from 'src/shared/components/Text';

type HeroProps = SectionProps;

export const Hero: React.FC<HeroProps> = (props) => {
	return (
		<Section
			{...props}
			css={{
				height: '100vh',
				display: 'grid',
				placeContent: 'center',
				gap: '$space08',
			}}
		>
			<Motion.Div
				initial={{ opacity: 0, y: 100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 2, type: 'spring' }}
			>
				<Heading css={{ maxWidth: '$max-w-3xl' }}>
					<Text fontStyle="L1">Bienvenido, soy</Text>

					<Heading fontStyle="L2" as="div" css={{ marginBlock: '$space01' }}>
						Philip Perez Castro,
					</Heading>

					<Text fontStyle="L1">
						Trainee React developer, 📚 autodidacta, interesado en ampliar mis
						conocimientos en <strong>JavaScript</strong> y{' '}
						<strong>Typescript</strong>.{' '}
					</Text>
				</Heading>

				<Box
					css={{
						marginBlockStart: '$space04',
						display: 'flex',
						gap: '$space02',
					}}
				>
					<Link href="/curriculum.pdf" passHref>
						<Button
							as="a"
							title="Curriculum"
							download="Philip Perez Castro Curriculum"
							target="_blank"
						>
							CV
						</Button>
					</Link>

					{socialList.map((v) => (
						<Link key={v.link} href={v.link} passHref>
							<IconButton
								as="a"
								target="_blank"
								asIcon={v.icon}
								title={v.title}
								size="sm"
								variant="outline"
							/>
						</Link>
					))}
				</Box>
			</Motion.Div>

			<Motion.Picture
				css={{ display: 'flex', gridRowStart: '1' }}
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 2, type: 'spring' }}
			>
				<Image
					priority
					src="/dev_programming.webp"
					alt="developer programming"
					width="737"
					height="536"
					css={{
						margin: 'auto',
						height: 'auto',
						width: '80%',
						maxWidth: '$max-w-md',
					}}
				/>
			</Motion.Picture>
		</Section>
	);
};
