import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from '@/shared/components/ui/separator';

describe('Separator', () => {
	it('renders a horizontal separator by default', () => {
		const { container } = render(<Separator />);
		const sep = container.firstChild as HTMLElement;
		expect(sep).toBeInTheDocument();
		expect(sep.className).toContain('w-full');
		expect(sep.className).toContain('border-primary-500');
	});

	it('renders a vertical separator', () => {
		const { container } = render(<Separator orientation='vertical' />);
		const sep = container.firstChild as HTMLElement;
		expect(sep.className).toContain('h-full');
	});

	it('merges custom className', () => {
		const { container } = render(<Separator className='my-8' />);
		const sep = container.firstChild as HTMLElement;
		expect(sep.className).toContain('my-8');
	});
});
