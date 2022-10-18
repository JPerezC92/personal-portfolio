import Link from 'next/link';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';
import { Box } from 'src/shared/components/Box';
import { Button } from 'src/shared/components/Button';
import { Heading } from 'src/shared/components/Heading';
import { Hr } from 'src/shared/components/Hr';
import { IconButton } from 'src/shared/components/IconButton';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = (props) => {
	const [isOpenNavbar, setIsOpenNavbar] = React.useState(false);

	return (
		<Box
			css={{
				position: 'fixed',
				inset: 0,
				width: '100%',
				height: 'max-content',
				backgroundColor: '$primary800_a30',
				zIndex: '1',
			}}
		>
			<Box
				as="header"
				css={{
					maxWidth: '$max-w-screen-lg',
					marginInline: 'auto',
					width: '100%',
					display: 'grid',
					gridTemplateColumns: '1fr auto',
					alignItems: 'center',
					padding: '$space04',
					position: 'relative',
					transition: 'all 0.5s ease-in-out',
					backdropFilter: 'blur(1rem)',
					'@lg': {
						paddingBlock: '$space06',
						paddingInline: '$space00',
					},
				}}
			>
				<Heading fontStyle="L5" as="span">
					Philip.
				</Heading>

				<Box
					as="nav"
					css={{
						transition:
							'height 0.10s ease-in-out, transform 0.3s ease-in-out',
						gridRowStart: '3',
						gridRowEnd: '3',
						gridColumnStart: '1',
						gridColumnEnd: '3',
						visibility: isOpenNavbar ? 'initial' : 'hidden',
						height: isOpenNavbar ? 'auto' : '0',
						opacity: isOpenNavbar ? '1' : '0',
						transform: isOpenNavbar ? 'scaleY(1)' : 'scaleY(0)',
						'@md': {
							visibility: 'initial',
							height: 'auto',
							opacity: '1',
							transform: 'scaleY(1)',
							gridRowStart: 'auto',
							gridRowEnd: 'auto',
							gridColumnStart: 'auto',
							gridColumnEnd: 'auto',
							display: 'flex',
						},
					}}
				>
					<Hr
						css={{
							gridRowStart: '2',
							gridColumnStart: '1',
							gridColumnEnd: '3',
							marginBlock: '$space04',
							'@md': { display: 'none' },
						}}
					/>

					<Box
						as="ul"
						css={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fit, minmax(min(100%,15rem), 1fr))',
							'@md': { display: 'flex' },
						}}
					>
						{[
							{ hash: 'about-me', name: 'Sobre mí' },
							{ hash: 'skills', name: 'Conocimientos' },
							{ hash: 'projects', name: 'Proyectos' },
						].map((value, i) => (
							<Box as="li" key={i}>
								<Link href={{ hash: value.hash }} passHref>
									<Button
										as="a"
										colorScheme="primary"
										variant="ghost"
										onClick={() => setIsOpenNavbar(false)}
										css={{
											width: '100%',
											textAlign: 'center',
											'@md': { width: 'auto' },
										}}
									>
										{value.name}
									</Button>
								</Link>
							</Box>
						))}
					</Box>
				</Box>

				<IconButton
					variant="ghost"
					size="lg"
					asIcon={FaHamburger}
					css={{ '@md': { display: 'none' } }}
					onClick={() => setIsOpenNavbar((s) => !s)}
				/>
			</Box>
		</Box>
	);
};
