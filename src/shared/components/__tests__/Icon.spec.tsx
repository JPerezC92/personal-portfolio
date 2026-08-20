import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from '@/shared/components/Icon/Icon';

describe('Icon', () => {
	it('renders the icon element inside an i tag', () => {
		render(<Icon icon={<svg data-testid='svg-icon' />} title='test icon' />);
		expect(screen.getByTitle('test icon').tagName).toBe('I');
		expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
	});

	it('applies default size classes', () => {
		render(<Icon icon={<svg />} title='icon' />);
		const el = screen.getByTitle('icon');
		expect(el.className).toContain('inline-block');
	});

	it('applies size variant', () => {
		render(<Icon icon={<svg />} size='2xl' title='large' />);
		const el = screen.getByTitle('large');
		expect(el.className).toContain('text-4xl');
	});
});
