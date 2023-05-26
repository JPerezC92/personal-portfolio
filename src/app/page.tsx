'use client';
import React from 'react';

import { Button } from '@/shared/components/Button';

export default function Home() {
	const [count, setCount] = React.useState<'primary' | 'secondary'>('primary');
	return (
		<>
			<main className='p-4'>
				<Button
					colorScheme={count}
					onClick={() =>
						setCount(s => (s === 'primary' ? 'secondary' : 'primary'))
					}
				>
					dasdsa
				</Button>
			</main>
		</>
	);
}
