import React from 'react';
import { SectionTitle } from 'src/landing/components/SectionTitle';
import { skillList } from 'src/landing/utils/skills';
import { Box } from 'src/shared/components/Box';
import { Icon } from 'src/shared/components/Icon';
import { Section } from 'src/shared/components/Section';
import { SectionProps } from 'src/shared/components/Section/Section';
import { Text } from 'src/shared/components/Text';

type SkillsProps = SectionProps;

export const Skills: React.FC<SkillsProps> = ({ ...props }) => {
	return (
		<Section
			{...props}
			animate={{ opacity: 0, y: 10 }}
			transition={{ duration: 2, type: 'spring' }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
		>
			<SectionTitle>Conocimientos</SectionTitle>

			<Box
				as="ul"
				css={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
					gap: '$space06',
					'@md': {
						display: 'grid',
						gridTemplateColumns:
							'repeat(auto-fit, minmax(4rem,1fr))',
					},
				}}
			>
				{skillList.map((skill) => (
					<Box
						as="li"
						key={skill.description}
						css={{ textAlign: 'center', minWidth: '20%' }}
					>
						<Icon
							css={{ color: skill.color }}
							size="xl"
							asIcon={skill.icon}
						/>

						<Text fontStyle="L1" as="p">
							{skill.description}
						</Text>
					</Box>
				))}
			</Box>
		</Section>
	);
};
