'use client';
import Link from 'next/link';
import React from 'react';
import { FaHamburger } from 'react-icons/fa';

import { Heading } from '@/shared/components/Heading/Heading';
import { Motion } from '@/shared/components/Motion/Motion';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';
import { EnumType, EnumTypeInfer } from '@/shared/utils/enumType';

import { headerBase, headerWrapper } from './AppBar.css';

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

	function toggleNav() {
		setNavState(state =>
			state === NavState.values.active
				? NavState.values.collapsed
				: NavState.values.active,
		);
	}

	return (
		<div className={cn(headerWrapper, className)}>
			<header className={headerBase}>
				<Button
					variant='ghost'
					size='icon'
					onClick={toggleNav}
					className='mr-4 md:hidden'
				>
					<FaHamburger />
				</Button>

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
								key={section.title}
								asChild
								colorScheme='primary'
								size='md'
								variant='link'
								className='capitalize'
								onClick={() => setNavState(NavState.values.collapsed)}
							>
								<Link href={section.link}>{section.title}</Link>
							</Button>
						))}
					</nav>
				</Motion>
			</header>
		</div>
	);
};
