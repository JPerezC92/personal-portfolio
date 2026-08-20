import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from '@/shared/components/Text/Text';

describe('Text', () => {
	it('renders as p by default', () => {
		render(<Text>Hello</Text>);
		const el = screen.getByText('Hello');
		expect(el.tagName).toBe('P');
	});

	it('renders as span when component prop is set', () => {
		render(<Text component='span'>Span text</Text>);
		const el = screen.getByText('Span text');
		expect(el.tagName).toBe('SPAN');
	});

	it('renders as div', () => {
		render(<Text component='div'>Div text</Text>);
		expect(screen.getByText('Div text').tagName).toBe('DIV');
	});

	it('applies default font classes', () => {
		render(<Text>Styled</Text>);
		const el = screen.getByText('Styled');
		expect(el.className).toContain('font-exo2');
		expect(el.className).toContain('tracking-wide');
	});

	it('applies fontSize variant', () => {
		render(<Text fontSize='xl'>Large</Text>);
		const el = screen.getByText('Large');
		expect(el.className).toContain('text-xl');
	});

	it('merges custom className', () => {
		render(<Text className='my-custom'>Custom</Text>);
		expect(screen.getByText('Custom').className).toContain('my-custom');
	});
});
