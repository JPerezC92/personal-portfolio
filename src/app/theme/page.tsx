import { Button } from '@/shared/components';

export default function ThemePage() {
	return (
		<main className='p-4'>
			<div>
				<h1 className='text-neutral-50 mb-4'>Buttons</h1>
				<div className='flex gap-4 flex-wrap'>
					<Button colorScheme='primary'>Button</Button>
					<Button colorScheme='secondary'>Button</Button>
					<Button colorScheme='primary' variant='outline'>
						Button
					</Button>
					<Button colorScheme='secondary' variant='outline'>
						Button
					</Button>
					<Button colorScheme='primary' variant='ghost'>
						Button
					</Button>
					<Button colorScheme='secondary' variant='ghost'>
						Button
					</Button>
					<Button colorScheme='primary' variant='link'>
						Button
					</Button>
					<Button colorScheme='secondary' variant='link'>
						Button
					</Button>
				</div>
			</div>
		</main>
	);
}
