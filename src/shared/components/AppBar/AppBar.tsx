'use client';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';

import { Button, Heading, IconButton, Motion } from '@/shared/components';
import { EnumType, EnumTypeInfer } from '@/shared/utils';

import * as AppBarCss from './AppBar.css';

type AppBarProps = {
	sections: { title: string; link: string }[];
	className?: string;
};

const NavState = EnumType('active', 'collapsed');
type NavState = EnumTypeInfer<typeof NavState>;

export const AppBar: React.FC<AppBarProps> = ({ className, sections }) => {
	const [navState, setNavState] = React.useState<NavState>(
		NavState.values.collapsed,
	);

	const headerCss = AppBarCss.header();

	function toggleNav() {
		setNavState(state =>
			state === NavState.values.active
				? NavState.values.collapsed
				: NavState.values.active,
		);
	}

	return (
		<div className={headerCss.wrapper({ className })}>
			<header className={headerCss.base()}>
				<IconButton
					icon={<FaHamburger />}
					variant='ghost'
					onClick={toggleNav}
					className='mr-4 md:hidden'
				/>

				<div>
					<Heading component='span' fontSize='2xl' className='font-black'>
						Philip.
					</Heading>
				</div>

				<Motion
					component='div'
					className='w-full hidden md:!contents'
					animate={navState}
					initial={{ display: 'none' }}
					variants={{
						active: {
							display: 'block',
							opacity: 1,
							height: 'auto',
						},
						collapsed: {
							overflow: 'hidden',
							opacity: 0,
							height: 0,
							transitionEnd: { display: 'none' },
						},
					}}
				>
					<hr className='my-3 border-primary-400' />

					<nav className='flex flex-col md:flex-row justify-between items-center w-full md:w-auto md:ml-auto gap-x-4 gap-y-2'>
						{sections.map(section => (
							<Button
								onClick={() => setNavState(NavState.values.collapsed)}
								className='capitalize'
								key={section.title}
								colorScheme='primary'
								component='a'
								href={section.link}
								size='md'
								variant='link'
							>
								{section.title}
							</Button>
						))}
					</nav>
				</Motion>
			</header>
		</div>
	);
};
