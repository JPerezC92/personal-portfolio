import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '@/shared/components/ui/button';

describe('Button', () => {
	it('renders with default variants', () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole('button', { name: 'Click me' });
		expect(button).toBeInTheDocument();
		expect(button.className).toContain('bg-primary-400');
	});

	it('renders with secondary color scheme', () => {
		render(<Button colorScheme='secondary'>Secondary</Button>);
		const button = screen.getByRole('button', { name: 'Secondary' });
		expect(button.className).toContain('bg-secondary-400');
	});

	it('renders outline variant', () => {
		render(<Button variant='outline'>Outline</Button>);
		const button = screen.getByRole('button', { name: 'Outline' });
		expect(button.className).toContain('border-primary-400');
		expect(button.className).toContain('hover:shadow-xs');
	});

	it('renders ghost variant', () => {
		render(<Button variant='ghost'>Ghost</Button>);
		const button = screen.getByRole('button', { name: 'Ghost' });
		expect(button.className).toContain('border-transparent');
	});

	it('renders link variant', () => {
		render(<Button variant='link'>Link</Button>);
		const button = screen.getByRole('button', { name: 'Link' });
		expect(button.className).toContain('before:border-primary-400');
		expect(button.className).toContain('overflow-hidden');
	});

	it('renders icon size', () => {
		render(<Button size='icon'>X</Button>);
		const button = screen.getByRole('button', { name: 'X' });
		expect(button.className).toContain('aspect-square');
	});

	it('handles click events', async () => {
		const onClick = vi.fn();
		render(<Button onClick={onClick}>Click</Button>);
		await userEvent.click(screen.getByRole('button'));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('is disabled when disabled prop is passed', () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('renders as child element with asChild', () => {
		render(
			<Button asChild>
				<a href='https://example.com'>Link</a>
			</Button>,
		);
		const link = screen.getByRole('link', { name: 'Link' });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute('href', 'https://example.com');
		expect(link.className).toContain('inline-flex');
	});

	it('merges custom className', () => {
		render(<Button className='custom-class'>Styled</Button>);
		const button = screen.getByRole('button', { name: 'Styled' });
		expect(button.className).toContain('custom-class');
	});

	it('forwards ref', () => {
		const ref = { current: null as HTMLButtonElement | null };
		render(<Button ref={ref}>Ref</Button>);
		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});
});
