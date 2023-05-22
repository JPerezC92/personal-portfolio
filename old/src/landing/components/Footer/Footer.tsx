import Link from 'next/link';
import React from 'react';
import { socialList } from 'src/landing/utils/socialList';
import { Box } from 'src/shared/components/Box';
import { IconButton } from 'src/shared/components/IconButton';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props) => {
	return (
		<Box
			as="footer"
			css={{
				display: 'flex',
				justifyContent: 'center',
				columnGap: '$space04',
				backgroundColor: '$primary800_a30',
				borderStyle: 'solid',
				borderWidth: '1px',
				borderColor: '$primary400_a30',
				borderInline: '0',
				paddingBlock: '$space04',
			}}
		>
			{socialList.map((v) => (
				<Link key={v.link} href="https://github.com/JPerezC92" passHref>
					<IconButton
						as="a"
						target="_blank"
						asIcon={v.icon}
						title={v.title}
						variant="outline"
						size="lg"
						css={{ color: '$primary400' }}
					/>
				</Link>
			))}
		</Box>
	);
};
