import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from '@/shared/components/Heading/Heading';

describe('Heading', () => {
	it('renders as h1 by default', () => {
		render(<Heading>Title</Heading>);
		expect(screen.getByText('Title').tagName).toBe('H1');
	});

	it('renders as h2 when component prop is set', () => {
		render(<Heading component='h2'>Subtitle</Heading>);
		expect(screen.getByText('Subtitle').tagName).toBe('H2');
	});

	it('renders as span', () => {
		render(<Heading component='span'>Inline</Heading>);
		expect(screen.getByText('Inline').tagName).toBe('SPAN');
	});

	it('applies uppercase and font classes', () => {
		render(<Heading>Styled</Heading>);
		const el = screen.getByText('Styled');
		expect(el.className).toContain('uppercase');
		expect(el.className).toContain('font-exo2');
	});

	it('applies fontSize variant', () => {
		render(<Heading fontSize='3xl'>Big</Heading>);
		const el = screen.getByText('Big');
		expect(el.className).toContain('text-3xl');
	});

	it('merges custom className', () => {
		render(<Heading className='extra'>Custom</Heading>);
		expect(screen.getByText('Custom').className).toContain('extra');
	});
});
