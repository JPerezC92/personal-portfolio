import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Highlight } from '@/shared/components/Highlight/Highlight';

describe('Highlight', () => {
	it('renders as bold element', () => {
		render(<Highlight>Important</Highlight>);
		const el = screen.getByText('Important');
		expect(el.tagName).toBe('B');
	});

	it('applies secondary color and text-shadow', () => {
		render(<Highlight>Glow</Highlight>);
		const el = screen.getByText('Glow');
		expect(el.className).toContain('text-secondary-300');
		expect(el.className).toContain('font-semibold');
	});

	it('merges custom className', () => {
		render(<Highlight className='extra'>Custom</Highlight>);
		expect(screen.getByText('Custom').className).toContain('extra');
	});
});
